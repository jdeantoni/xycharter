package io.github.ter_xycharter.render;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.json.simple.JSONArray;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import xycharter.Figure;
import static org.junit.Assert.assertTrue;


public class CucumberStepDefinitions extends RenderserviceApplicationTests{
    Renderer renderer = new Renderer();
    Figure figure;
    int nbPointsBefore, nbPointsAfter;

    @Then("the number of point in the figure is increased")
    public void theNumberOfPointInTheFigureIsIncreased() {
        nbPointsAfter = figure.getNbPoints();
        assertTrue(nbPointsAfter>nbPointsBefore);
    }

    @Given("there's a empty figure")
    public void thereSAEmptyFigure() {
        figure = new Figure();
        nbPointsBefore = figure.getNbPoints();
    }

    @When("we want to add the point \\({double},{double}) to the figure")
    public void weWantToAddThePointXYToTheFigure(double x, double y) {
        JSONParser jsonParser = new JSONParser();

        JSONArray jsonArray = null;
        try {
            jsonArray = (JSONArray) jsonParser.parse("[{\"x\":"+x+",\"y\":"+y+"}]");
            renderer.addPoints(figure,jsonArray);
        } catch (ParseException e) {
            e.printStackTrace();
        }



    }
}
