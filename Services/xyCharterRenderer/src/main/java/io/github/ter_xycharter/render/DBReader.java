package io.github.ter_xycharter.render;


import io.github.cdimascio.dotenv.Dotenv;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;

public class DBReader {
    private static final Dotenv dotenv = Dotenv.configure()
            .load();

    /**
     * Connect to the DatabaseReader service and get the characteristics of the graph
     * associated to the ID
     * @param idGraph The ID of the graph
     * @return An JSONObject that contains all the characteristics of the graph
     */
    public static JSONObject getGraphFromDB(String idGraph){
        try {
            System.out.println("Demande des caractéristiques du graphe "+idGraph+" auprès de databaseReader");
            //Get query to DatabaseReader service
            URL url = new URL(dotenv.get("DBREADER_ADDR") + "/graphs/"+idGraph);
            URLConnection urlConnection = url.openConnection();

            //Get the response from the DatabaseReader Service
            BufferedReader in = new BufferedReader(
                    new InputStreamReader(
                            urlConnection.getInputStream()));
            String inputLine;
            StringBuilder stringBuilder = new StringBuilder();
            while ((inputLine = in.readLine()) != null)
                stringBuilder.append(inputLine);
            in.close();

            //Parse the response to have an JSON array and return it
            JSONParser jsonParser = new JSONParser();
            JSONArray array = (JSONArray)jsonParser.parse(stringBuilder.toString());
            return (JSONObject) array.get(0);
        } catch (IOException | ParseException e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * Connect to the DatabaseReader service and get all the datasets
     * associated to the graph with the given ID
     * @param idGraph The ID of the graph
     * @return An JSONArray that contains all the datasets associated to the graph
     */
    public static JSONArray getAllDataForGraph(String idGraph){
        try {
            System.out.println("Demande de toutes les data des différents dataset associé au graphe");
            //Get query to DatabaseReader service
            URL url = new URL(dotenv.get("DBREADER_ADDR") + "/graphs/" + idGraph + "/datas");
            URLConnection urlConnection = url.openConnection();
            //Get the response from the DatabaseReader Service
            BufferedReader in = new BufferedReader(
                    new InputStreamReader(
                            urlConnection.getInputStream()));
            String inputLine;
            StringBuilder stringBuilder = new StringBuilder();
            while ((inputLine = in.readLine()) != null)
                stringBuilder.append(inputLine);
            in.close();
            //Parse the response to have an JSON array and return it
            JSONParser jsonParser = new JSONParser();
            return (JSONArray)jsonParser.parse(stringBuilder.toString());
        } catch (IOException | ParseException e) {
            e.printStackTrace();
            return null;
        }
    }


}