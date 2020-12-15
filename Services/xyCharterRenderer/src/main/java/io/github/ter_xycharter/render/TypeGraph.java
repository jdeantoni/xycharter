package io.github.ter_xycharter.render;

/**
 * Represent all the type of graph that can be generated with the XYCharterRender
 */
public enum TypeGraph {

    HISTOGRAM("histogramme"),
    CONNECTEDLINE("connectedLine"),
    CIRCLEPOINT("circlePoint"),
    BEZIERCURVE("bezierCurve");

    final private String type;

    TypeGraph(String type) {
        this.type = type;
    }

    public String getText() {
        return this.type;
    }

    /**
     * Get the TypeGraph from the string
     * @param text The name of the TypeGraph
     * @return The corresponding TypeGraph
     */
    public static TypeGraph fromString(String text) {
        for (TypeGraph b : TypeGraph.values()) {
            if (b.type.equalsIgnoreCase(text)) {
                return b;
            }
        }
        return null;
    }
}
