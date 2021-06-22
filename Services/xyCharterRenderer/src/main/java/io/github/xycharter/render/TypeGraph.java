package io.github.xycharter.render;

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

    public static TypeGraph fromString(String text) {
        for (TypeGraph b : TypeGraph.values()) {
            if (b.type.equalsIgnoreCase(text)) {
                return b;
            }
        }
        return null;
    }
}
