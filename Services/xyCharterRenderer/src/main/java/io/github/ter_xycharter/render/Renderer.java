package io.github.ter_xycharter.render;


import io.github.ter_xycharter.render.config.DistinctColors;
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

    /**
     * Generate a graph thanks to data stored in database (Influx or Postgresql)
     * Graph can be a JPEG/PNG image or JSON (with all the characteristics of the graph)
     *
     * @param idGraph id of the graph you want to display
     * @param type Media type of the graph (JPEG, PNG, JSON)
     * @return Return the graph with the proper type
     * @throws ParseException Thrown if no "datajson" in the datasets of the graph
     *
     * @author Fabrice SIMON
     */
    @RequestMapping(value = "/graphs/{idGraph}", method = RequestMethod.GET,produces = MediaType.IMAGE_JPEG_VALUE)
    public @ResponseBody byte[] getGraph(@PathVariable String idGraph,@RequestParam OutputGraph type) throws ParseException {
        //Get the graph from the databases
        JSONObject graphJSON = DBReader.getGraphFromDB(idGraph);

        if (graphJSON != null){
            //Get all the datasets associate to the graph
            JSONArray datasets = DBReader.getAllDataForGraph(idGraph);

            Plot plot = new Plot();
            //Create a new graph from the graph JSON
            Graph graph = Graph.createGraph(graphJSON);
            DistinctColors distinctColors = new DistinctColors();
            int count = 0;
            for (Object o : datasets) {
                JSONObject dataset = (JSONObject) o;
                JSONParser jsonParser = new JSONParser();
                //Parse all the points of the dataset
                JSONArray pointsArray = (JSONArray) jsonParser.parse((String)dataset.get("datajson"));
                //Parse the name of the datasate
                String nameDataSet = (String) dataset.get("name");
                if (nameDataSet==null)nameDataSet = ""+count;
                if (pointsArray!=null){
                    Figure figure = new Figure();
                    //Associate the name to the figure (VERY IMPORTANT TO ASSOCIATE A NAME TO A FIGURE TO HAVE MULTIPLE DATASETS ON THE SAME GRAPH)
                    figure.name= nameDataSet;
                    addPoints(figure,pointsArray); //Add all the points of the dataset to the figure
                    graph.initializeRenderer(figure); //Add the renderer to the figure
                    figure.setColor(distinctColors.getNextColor());
                    plot.addFigure(figure); //Add the figure to the plot
                    graph.getGraphConfig().applyConfigToGraph(plot); //Apply the graph configuration to the graph
                }
                count ++;
            }

            switch(type){
                //The PNG and JPG plotters are inverted in the XYCharter library
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


    @RequestMapping(value = "/ping", method = RequestMethod.GET)
    public @ResponseBody String ping() throws ParseException {
        return "ok";

    }


    /**
     *
     * @param figure Figure of the graph
     * @param points Array of all the points to add to the figure
     * @author Fabrice SIMON
     */
    public void addPoints(Figure figure,JSONArray points){
        for (Object o : points) {
            JSONObject point = (JSONObject) o;
            double x = Double.parseDouble(point.get("x").toString());
            double y = Double.parseDouble(point.get("y").toString());
            figure.addPoint(x,y);
        }
    }


}