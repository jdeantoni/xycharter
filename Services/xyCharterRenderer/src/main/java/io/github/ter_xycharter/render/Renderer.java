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

@RestController
public class Renderer {


    @RequestMapping(value = "/graphs/{idGraphe}", method = RequestMethod.GET,produces = MediaType.IMAGE_JPEG_VALUE)
    public @ResponseBody byte[] getGraph(@PathVariable String idGraphe,@RequestParam OutputGraph type) throws ParseException {
        JSONObject graphe = DBReader.getGraphFromDB(idGraphe);
        if (graphe != null){
            JSONArray datasets = DBReader.getAllDataForGraph(idGraphe);
            Plot plot = new Plot();
            Graph graph = Graph.createGraph(graphe,plot);
            for (Object o : datasets) {
                JSONObject dataset = (JSONObject) o;
                JSONParser jsonParser = new JSONParser();
                JSONArray pointsArray = (JSONArray) jsonParser.parse((String)dataset.get("datajson"));
                String nameDataSet = (String) dataset.get("name");
                if (pointsArray!=null){
                    Figure figure = new Figure();
                    figure.name= nameDataSet.toString();
                    addPoints(figure,pointsArray);
                    graph.initializeRenderer(figure);
                    graph.getPlot().addFigure(figure);
                    graph.getGraphConfig().applyConfigToGraph(plot);
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

    @RequestMapping(value = "/graphs/{timestamp}/{idGraphe}", method = RequestMethod.GET,produces = MediaType.IMAGE_JPEG_VALUE)
    public @ResponseBody byte[] getGraph(@PathVariable String idGraphe,@RequestParam OutputGraph type,@PathVariable String timestamp) throws ParseException {
        return getGraph(idGraphe, type);

    }


    public void addPoints(Figure figure,JSONArray points){
        for (Object o : points) {
            JSONObject point = (JSONObject) o;
            double x = Double.parseDouble(point.get("x").toString());
            double y = Double.parseDouble(point.get("y").toString());
            figure.addPoint(x,y);
        }
    }


}
