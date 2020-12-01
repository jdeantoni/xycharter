package io.github.ter_xycharter.render;



import com.fasterxml.jackson.core.JsonParser;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import xycharter.*;
import xycharter.render.ConnectedLineFigureRenderer;
import xycharter.render.HistogramPointRenderer;

import io.github.cdimascio.dotenv.Dotenv;

import java.awt.*;
import java.io.*;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.util.Objects;

@RestController
public class Renderer {
    private Dotenv dotenv;

    @RequestMapping(value = "/graph/{idGraphe}", method = RequestMethod.GET,produces = MediaType.IMAGE_JPEG_VALUE)
    public @ResponseBody byte[] getGraph(@PathVariable String idGraphe,@RequestParam OutputGraph type) throws ParseException {
        dotenv = Dotenv.configure()
            .directory("./.env")
            .load();

        JSONObject graphe = getGraphFromDB(idGraphe);
        //System.out.println(graphe);
        if (graphe != null){
            JSONArray dataset = getAllDataForGraph(idGraphe);
            Plot plot = new Plot();
            for (Object o : dataset) {
                JSONObject data = (JSONObject) o;
                JSONParser jsonParser = new JSONParser();
                JSONArray pointsArray = (JSONArray) jsonParser.parse((String)data.get("datajson"));
                if (pointsArray!=null){
                    Figure figure = new Figure();
                    addPoints(figure,pointsArray);
                    initializeRenderer(figure,idGraphe);
                    plot.addFigure(figure);
                }
            }
            switch(type){
                case PNG:
                    JPEGPlotter jpegPlotter = new JPEGPlotter();
                    return jpegPlotter.plot(plot);
                case JPG:
                    PNGPlotter pngPlotter = new PNGPlotter();
                    return pngPlotter.plot(plot);
                default:
                    return "Error, type not supported".getBytes();

            }
        }else {
            return "Error: ID not found".getBytes();
        }

    }



    public JSONObject getGraphFromDB(String id){
        try {
            //System.out.println("Demande des caractéristiques du graphe "+id+" auprès de databaseReader");
            URL url = new URL(dotenv.get("DBREADER_ADDR") + "/graph/cara/"+id);
            URLConnection urlConnection = url.openConnection();
            BufferedReader in = new BufferedReader(
                    new InputStreamReader(
                            urlConnection.getInputStream()));
            String inputLine;
            StringBuilder stringBuilder = new StringBuilder();
            while ((inputLine = in.readLine()) != null)
                stringBuilder.append(inputLine);
            in.close();
            JSONParser jsonParser = new JSONParser();
            JSONArray array = (JSONArray)jsonParser.parse(stringBuilder.toString());
            return (JSONObject) array.get(0);
        } catch (IOException | ParseException e) {
            e.printStackTrace();
            return null;
        }
    }

    public JSONArray getAllDataForGraph(String idGraphe){
        try {
            //System.out.println("Demande de toutes les data des différents dataset associé au graphe");
            URL url = new URL(dotenv.get("DBREADER_ADDR") + "/datareader/data/" + idGraphe);
            URLConnection urlConnection = url.openConnection();
            BufferedReader in = new BufferedReader(
                    new InputStreamReader(
                            urlConnection.getInputStream()));
            String inputLine;
            StringBuilder stringBuilder = new StringBuilder();
            while ((inputLine = in.readLine()) != null)
                stringBuilder.append(inputLine);
            in.close();
            JSONParser jsonParser = new JSONParser();
            return (JSONArray)jsonParser.parse(stringBuilder.toString());
        } catch (IOException | ParseException e) {
            e.printStackTrace();
            return null;
        }
    }

    public void addPoints(Figure figure,JSONArray points){
        for (Object o : points) {
            JSONObject point = (JSONObject) o;
            double x = Double.parseDouble(point.get("x").toString());
            double y = Double.parseDouble(point.get("y").toString());
            figure.addPoint(x,y);
        }
    }


    public void initializeRenderer(Figure figure, String idGraph){
        JSONObject typeJSON = getTypeForGraph(idGraph);
        String type = typeJSON.get("graphtype").toString();
        TypeGraph typeGraph = TypeGraph.fromString(type);
        //System.out.println("Type du graphe: "+type);
        switch (Objects.requireNonNull(typeGraph)){
            case HISTOGRAM:
                figure.rendererList.add(new HistogramPointRenderer((x,
                                                                    y) -> new Color(0, 141, 255, 102)));
                break;
            case CONNECTEDLINE:
                figure.rendererList.add(new ConnectedLineFigureRenderer());
                break;
        }
    }

    public JSONObject getTypeForGraph(String idGraph){
        try {
            //System.out.println("Demande le type du graphe "+idGraph);
            URL url = new URL(dotenv.get("DBREADER_ADDR") + "/graph/type/" + idGraph);
            URLConnection urlConnection = url.openConnection();
            BufferedReader in = new BufferedReader(
                    new InputStreamReader(
                            urlConnection.getInputStream()));
            String inputLine;
            StringBuilder stringBuilder = new StringBuilder();
            while ((inputLine = in.readLine()) != null)
                stringBuilder.append(inputLine);
            in.close();
            JSONParser jsonParser = new JSONParser();
            JSONObject typeJSON = (JSONObject)((JSONArray)jsonParser.parse(stringBuilder.toString())).get(0);

            return typeJSON;
        } catch (IOException | ParseException e) {
            e.printStackTrace();
            return null;
        }
    }

    public void addLegend(Plot plot,String legend){
        plot.getSpace().getLegend().setText(legend);
    }
}
