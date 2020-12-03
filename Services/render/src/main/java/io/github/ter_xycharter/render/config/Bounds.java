package io.github.ter_xycharter.render.config;

public class Bounds {
    public Double lowerBound, upperBound;

    public Bounds(Double lowerBound, Double upperBound) {
        this.lowerBound = lowerBound;
        this.upperBound = upperBound;
    }

    @Override
    public String toString() {
        return "("+lowerBound +
                "," + upperBound+")";
    }
}
