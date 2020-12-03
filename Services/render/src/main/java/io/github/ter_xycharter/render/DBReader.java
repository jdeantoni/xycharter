package io.github.ter_xycharter.render;

import io.github.cdimascio.dotenv.Dotenv;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import xycharter.Figure;
import xycharter.render.ConnectedLineFigureRenderer;
import xycharter.render.HistogramPointRenderer;

import java.awt.*;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.util.Objects;
import io.github.cdimascio.dotenv.Dotenv;

public class DBReader {
    private static final Dotenv dotenv = Dotenv.configure()
            .load();

    public static JSONObject getGraphFromDB(String id){
        try {
            System.out.println("Demande des caractéristiques du graphe "+id+" auprès de databaseReader");
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

    public static JSONArray getAllDataForGraph(String idGraphe){
        try {
            System.out.println("Demande de toutes les data des différents dataset associé au graphe");
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


}
