package io.github.ter_xycharter.render;



import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import xycharter.Figure;
import xycharter.JPEGPlotter;
import xycharter.PNGPlotter;
import xycharter.Plot;
import xycharter.render.ConnectedLineFigureRenderer;
import xycharter.render.HistogramPointRenderer;


import java.awt.*;
import java.io.*;
import java.util.Objects;

@RestController
public class Renderer {

    @RequestMapping(value = "/graph/{id}", method = RequestMethod.GET,produces = MediaType.IMAGE_JPEG_VALUE)
    public @ResponseBody byte[] getGraph(@PathVariable String id,@RequestParam OutputGraph type){

        JSONObject graphe = getGraphFromDB(id);
        if (graphe != null){
            JSONArray dataSet = (JSONArray) graphe.get("datasId");
            Plot plot = new Plot();
            for (Object o : dataSet) {
                JSONArray pointsArray = getData((String) o);
                if (pointsArray!=null){
                    Figure figure = new Figure();
                    addPoints(figure,pointsArray);
                    initializeRenderer(figure,graphe);
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
            FileReader fileReader =new FileReader("GraphDataBase.json");
            JSONParser jsonParser = new JSONParser();
            JSONObject database = (JSONObject)jsonParser.parse(fileReader);
            JSONArray graphs = (JSONArray) database.get("graph");
            for (Object object : graphs) {
                JSONObject graph = (JSONObject)object;
                if (graph.get("id").equals(id) ){
                    return graph;
                }
            }
            return null;
        } catch (IOException | ParseException e) {
            e.printStackTrace();
            return null;
        }
    }

    public JSONArray getData(String id){
        try {
            FileReader fileReader =new FileReader("GraphDataBase.json");
            JSONParser jsonParser = new JSONParser();
            JSONObject database = (JSONObject)jsonParser.parse(fileReader);
            JSONArray graphPoints = (JSONArray) database.get("graphPoints");
            for (Object object : graphPoints) {
                JSONObject data = (JSONObject)object;
                if (data.get("id").equals(id) ){
                    return (JSONArray) data.get("points");
                }
            }
            return null;
        } catch (IOException | ParseException e) {
            e.printStackTrace();
            return null;
        }
    }

    public void addPoints(Figure figure,JSONArray points){
        for (Object o : points) {
            JSONObject point = (JSONObject) o;
            figure.addPoint(((double) point.get("x")), ((double) point.get("y")));
        }
    }

    public void initializeRenderer(Figure figure, JSONObject graphe){
        String type = (String)graphe.get("type");
        TypeGraph typeGraph = TypeGraph.fromString(type);
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

    public void addLegend(Plot plot,String legend){
        plot.getSpace().getLegend().setText(legend);
    }
}
