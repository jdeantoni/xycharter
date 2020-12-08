package io.github.ter_xycharter.render.config;

import xycharter.Plot;
import xycharter.Space;

import java.awt.*;

public class GraphConfig {

    Boolean showX,showY,showGrid;
    Bounds xBounds, yBounds;
    String xLegend, yLegend, graphLegend;
    ColorGraph backgroundColor,gridColor;


    public GraphConfig(Boolean showX, Boolean showY, Boolean showGrid, Bounds xBound, Bounds yBound, String xLegend, String yLegend, String graphLegend, ColorGraph backgroundColor, ColorGraph gridColor) {
        this.showX = showX;
        this.showY = showY;
        this.showGrid = showGrid;
        this.xBounds = xBound;
        this.yBounds = yBound;
        this.xLegend = xLegend;
        this.yLegend = yLegend;
        this.graphLegend = graphLegend;
        this.backgroundColor = backgroundColor;
        this.gridColor = gridColor;
    }

    public void applyConfigToGraph(Plot plot){
        Space space = plot.getSpace();
        space.getXDimension().getOriginAxis().setVisible(false);
        space.getYDimension().getOriginAxis().setVisible(false);
        //X axis
        if (showX!=null)space.getXDimension().getLowerBoundAxis().setVisible(showX);
        if (xBounds!=null)space.getXDimension().setBounds(xBounds.lowerBound-0.125,xBounds.upperBound);
        else space.getXDimension().setAutoBounds(true);
        if (xLegend!=null)space.getXDimension().getLegend().setText(xLegend);

        //Y axis
        if (showY!=null)space.getYDimension().getLowerBoundAxis().setVisible(showY);
        if (yBounds!=null)space.getYDimension().setBounds(yBounds.lowerBound-0.125,yBounds.upperBound);
        else space.getXDimension().setAutoBounds(true);
        if (yLegend!=null)space.getYDimension().getLegend().setText(yLegend);

        //Graph
        if (graphLegend!=null)space.getLegend().setText(graphLegend);
        if (backgroundColor!=null)space.setBackgroundColor(new Color(backgroundColor.r, backgroundColor.g, backgroundColor.b, backgroundColor.a));
        if (showGrid!=null)space.setGridVisible(showGrid);
    }

    @Override
    public String toString() {
        return "GraphConfig{" +
                "showX=" + showX +
                ", showY=" + showY +
                ", showGrid=" + showGrid +
                ", xBound=" + xBounds +
                ", yBound=" + yBounds +
                ", xLegend='" + xLegend + '\'' +
                ", yLegend='" + yLegend + '\'' +
                ", graphLegend='" + graphLegend + '\'' +
                ", backgroundColor=" + backgroundColor +
                ", gridColor=" + gridColor +
                '}';
    }
}
