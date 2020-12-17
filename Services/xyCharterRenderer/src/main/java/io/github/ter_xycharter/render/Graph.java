package io.github.ter_xycharter.render;

import com.google.gson.Gson;
import io.github.ter_xycharter.render.config.GraphConfig;
import org.json.simple.JSONObject;
import xycharter.Figure;
import xycharter.render.BezierCurveFigureRenderer;
import xycharter.render.CirclePointRenderer;
import xycharter.render.ConnectedLineFigureRenderer;
import xycharter.render.HistogramPointRenderer;

import java.awt.*;

/**
 * Store all the information of a graph
 * @author Fabrice SIMON
 */
public class Graph {

    private String idGraph;
    private GraphConfig graphConfig;
    private TypeGraph typeGraph;

    /**
     * Constructor of a graph
     * @param idGraph The ID of the graph
     * @param graphConfig The config of the graph (all characteristics)
     * @param typeGraph The type of the graph (histogram, connectedLine...)
     */
    public Graph(String idGraph, GraphConfig graphConfig, TypeGraph typeGraph) {
        this.idGraph = idGraph;
        this.graphConfig = graphConfig;
        this.typeGraph = typeGraph;
    }

    /**
     * Create a new graph from a JSON object and associate a plot to it
     * @param graphe The JSON object with all the graph data
     * @return The graph created
     */
    public static Graph createGraph(JSONObject graphe){
        String idGraph = graphe.get("idgraph").toString();
        GraphConfig graphConfig = createGraphConfig(graphe.get("characteristics").toString());
        TypeGraph typeGraph = TypeGraph.fromString(graphe.get("graphtype").toString());
        return new Graph(idGraph,graphConfig,typeGraph);
    }

    /**
     * Associate a renderer to the figure of the graph
     * @param figure XYCharter figure of the graph (figure == dataset)
     */
    public void initializeRenderer(Figure figure){

        switch (typeGraph){
            case HISTOGRAM:
                figure.rendererList.add(new HistogramPointRenderer((x,
                                                                    y) -> new Color(0, 141, 255, 102)));
                break;
            case CONNECTEDLINE:
                figure.rendererList.add(new ConnectedLineFigureRenderer());
                break;
            case CIRCLEPOINT:
                figure.rendererList.add(new ConnectedLineFigureRenderer());
                figure.rendererList.add(new CirclePointRenderer(i -> 5));
                break;
            case BEZIERCURVE:
                figure.rendererList.add(new CirclePointRenderer(i -> 5));
                figure.rendererList.add(new BezierCurveFigureRenderer());
                break;
        }
    }

    public String getIdGraph() {
        return idGraph;
    }

    public void setIdGraph(String idGraph) {
        this.idGraph = idGraph;
    }

    public GraphConfig getGraphConfig() {
        return graphConfig;
    }

    public void setGraphConfig(GraphConfig graphConfig) {
        this.graphConfig = graphConfig;
    }

    public TypeGraph getTypeGraph() {
        return typeGraph;
    }

    public void setTypeGraph(TypeGraph typeGraph) {
        this.typeGraph = typeGraph;
    }


    private static GraphConfig createGraphConfig(String characteristics){
        Gson gson = new Gson();
        return gson.fromJson(characteristics,GraphConfig.class);
    }
}