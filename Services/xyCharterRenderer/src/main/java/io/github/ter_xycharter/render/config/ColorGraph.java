package io.github.ter_xycharter.render.config;

/**
 * Color for the graph
 */
public class ColorGraph {
    /**
     *
     * @param r Red value
     * @param g Green value
     * @param b Blue value
     * @param a Opacity
     */
    public ColorGraph(Integer r, Integer g, Integer b, Integer a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    Integer r,g,b,a;
}