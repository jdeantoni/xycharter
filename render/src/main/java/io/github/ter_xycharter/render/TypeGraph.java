package io.github.ter_xycharter.render;

public enum TypeGraph {

    HISTOGRAM("histogramme"),
    CONNECTEDLINE("connectedLine");

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
