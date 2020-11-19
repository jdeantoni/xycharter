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

@RestController
public class Renderer {

    @RequestMapping(value = "/graph/{id}", method = RequestMethod.GET,produces = MediaType.IMAGE_JPEG_VALUE)
    public @ResponseBody byte[] getGraph(@PathVariable int id,@RequestParam OutputGraph type){

        JSONObject graphe = getGraphFromDB(id);
        if (graphe != null){
            JSONArray points = (JSONArray) graphe.get("points");
            final Figure figure = new Figure();

            addPoints(figure,points);
            Plot plot = new Plot();
            TypeGraph typeGraph = TypeGraph.HISTOGRAM;
            switch (typeGraph){

                case HISTOGRAM:
                    figure.rendererList.add(new HistogramPointRenderer((x,
                                                                        y) -> new Color(0, 141, 255, 102)));
                    break;
                case CONNECTEDLINE:
                    figure.rendererList.add(new ConnectedLineFigureRenderer());
                    break;
            }

            plot.addFigure(figure);
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

    private JSONObject getGraphFromDB(int id){
        try {
            FileReader fileReader =new FileReader("GraphDataBase2.json");
            JSONParser jsonParser = new JSONParser();
            JSONObject database = (JSONObject)jsonParser.parse(fileReader);
            JSONArray graphs = (JSONArray) database.get("graphes");
            for (Object object : graphs) {
                JSONObject graph = (JSONObject)object;
                if ((Long) graph.get("id") == id){
                    return graph;
                }
            }
            return null;
        } catch (IOException | ParseException e) {
            e.printStackTrace();
            return null;
        }
    }

    private void addPoints(Figure figure,JSONArray points){
        for (Object o : points) {
            JSONObject point = (JSONObject) o;
            figure.addPoint(((Long) point.get("x")).doubleValue(), ((Long) point.get("y")).doubleValue());
        }
    }

    private void addLegend(Plot plot,String legend){
        plot.getSpace().getLegend().setText(legend);
    }
}
