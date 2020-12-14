<template>
  <v-container id="view-graph" fluid tag="section">
    <v-row>
      <v-col cols="12">
        <v-col offset-md="10">
          <v-text-field
            label="Search by id"
            v-model="idGraph"
            v-on:change="setGraphId(idGraph)"
            color="secondary"
            hide-details
            style="max-width: 165px"
          >
            <template v-if="$vuetify.breakpoint.mdAndUp" v-slot:append-outer>
              <v-btn @click="searchGraph(idGraph)" class="mt-n2" elevation="1" fab small>
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </template>
          </v-text-field>
        </v-col>
        <v-card-text class="px-0 pb-0">
          <v-container fluid>
            <v-col offset-md="5">
              <v-dialog v-model="dialog" scrollable max-width="300px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    @click="viewGraphs(graphs)"
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon> {{ viewIcon }}</v-icon>
                    View Graphs
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>Select Graphs</v-card-title>
                  <v-divider></v-divider>
                  <v-card-text style="height: 300px">
                    <v-checkbox
                      v-model="graphsSelected"
                      v-for="graph in graphs"
                      :key="graph"
                      :label="graph"
                      color="blue"
                      :value="graph"
                      hide-details
                    ></v-checkbox>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-btn color="blue darken-1" text @click="dialog = false">
                      Close
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="
                        dialog = false;
                        saveGraphSelected(graphsSelected);
                      "
                    >
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-col>
            <v-row>
              <v-img
                v-for="graph in showImageGraphSelected"
                :key="graph.id"
                :max-height="width"
                :max-width="width"
                :src="graph.img"
              ></v-img>
            </v-row>
            <v-divider></v-divider>
            <v-btn
              color="success"
              @click="
                reveal = !reveal;
                reveal ? (width = 300) : (width = 600);
                reveal ? (labelEdit = 'Close options') : (labelEdit = 'Modify options');
              "
              block
            >
              <v-icon>{{ editIcon }}</v-icon>
              {{ labelEdit }}
            </v-btn>

            <v-card v-if="reveal" elevation="11" tile>
              <v-card-text>
                <v-container fluid>
                  <v-select
                    :items="graphsSelected"
                    label="Select a graph to modify"
                    data-vv-name="select graph"
                    v-on:change="setGraphId()"
                    v-model="graphNameSelected"
                  ></v-select>
                  <v-row>
                    <v-col cols="12" sm="4" md="4">
                      <h3>Background color</h3>
                      <v-color-picker
                        v-model="color"
                        dot-size="16"
                        mode="hexa"
                        swatches-max-height="167"
                      ></v-color-picker>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <h2>Grid</h2>
                      <v-checkbox
                        v-model="showX"
                        label="Show X"
                        color="black"
                        hide-details
                      ></v-checkbox>
                      <v-checkbox
                        v-model="showY"
                        label="Show Y"
                        color="black"
                        hide-details
                      ></v-checkbox>

                      <v-checkbox
                        v-model="showGrid"
                        label="Show Grid"
                        color="black"
                        hide-details
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <h2>Axe options</h2>
                      <v-text-field v-model="legendX" label="Axe X Name"></v-text-field>
                      <v-text-field v-model="legendY" label="Axe Y Name"></v-text-field>
                    </v-col>
                  </v-row>

                  <v-divider></v-divider>
                  <v-row class="mt-12">
                    <v-col cols="12" sm="4" md="4">
                      <h2>X Bounds</h2>
                      <v-slider
                        v-model="minX"
                        label="Min"
                        :min="0"
                        :thumb-color="blue"
                        thumb-label="always"
                      ></v-slider>

                      <v-slider
                        v-model="maxX"
                        label="Max"
                        :max="1000"
                        :thumb-color="red"
                        thumb-label="always"
                      ></v-slider>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <h2>Y Bounds</h2>

                      <v-slider
                        v-model="minY"
                        label="MinY"
                        :min="0"
                        :thumb-color="blue"
                        thumb-label="always"
                      ></v-slider>

                      <v-slider
                        v-model="maxY"
                        label="MaxY"
                        :max="1000"
                        :thumb-color="red"
                        thumb-label="always"
                      ></v-slider>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <h2>Title graph</h2>
                      <v-text-field v-model="title" label="Title"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-col cols="12" sm="4" md="4">
                    <v-btn @click="saveChange()" depressed color="primary"> Save </v-btn>
                  </v-col>
                </v-container>
              </v-card-text>
            </v-card>
          </v-container>
        </v-card-text>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mdiAccount, mdiChartLine, mdiPencil, mdiShareVariant, mdiDelete } from "@mdi/js";
const axios = require("axios");

const gradients = [
  ["#222"],
  ["#42b3f4"],
  ["red", "orange", "yellow"],
  ["purple", "violet"],
  ["#00c6ff", "#F0F", "#FF0"],
  ["#f72047", "#ffd200", "#1feaea"],
];

var graphsSel = [];
var allGraphs = [];
export default {
  name: "View graphs",
  data: () => ({
    dialog: false,
    fill: true,
    gradient: gradients[4],
    gradients,
    idGraph: "",
    graphNameSelected: undefined,
    image: "",
    showX: false,
    showY: false,
    showGrid: false,
    minX: 0,
    minY: 0,
    maxX: 500,
    maxY: 500,
    handle: undefined,
    legendX: "",
    legendY: "",
    reveal: false,
    editIcon: mdiPencil,
    viewIcon: mdiChartLine,
    labelEdit: "Modify options",
    graphs: [],
    graphsSelected: [],
    showImageGraphSelected: [],
    graphsS: [],
    padding: 8,
    radius: 10,
    dialogm1: "",
    dialog: false,
    color: "",
    width: 600,
    title: "",
    searchGraph(listGraphSearched) {
      listGraphSearched.forEach(async (graph) => {
        let handle = setInterval(
          async () =>
            await axios
              .get("http://localhost:4000/graphs/" + graph.idgraph + "/render?type=JPG")
              .then((response) => {
                if (
                  !graphsSel.includes(graphsSel.find((el) => el.id === graph.idgraph))
                ) {
                  graphsSel.push({ id: graph.idgraph, img: response.data.data });
                  this.showImageGraphSelected = Array.from(graphsSel);
                }
                graphsSel.find((el) => el.id === graph.idgraph).img = response.data.data;
              }),
          1000
        );
      });
    },
    setGraphId() {
      if (this.graphNameSelected !== undefined) {
        this.idGraph = allGraphs.find((el) => el.name === this.graphNameSelected).idgraph;
        console.log(this.idGraph)
      }
    },
    async showXGrid(showXGrid) {
      const showX = await axios
        .put("http://localhost:4000/graphs/" + this.idGraph, { showX: showXGrid })
        .then((response) => {
          console.log(response.data);
        });
      return showX;
    },
    async showYGrid(showYGrid) {
      const showY = await axios
        .put("http://localhost:4000/graphs/" + this.idGraph, { showY: showYGrid })
        .then((response) => {
          console.log(response.data);
        });
      return showY;
    },
    async showCGrid(showCGrid) {
      const showC = await axios
        .put("http://localhost:4000/graphs/" + this.idGraph, { showGrid: showCGrid })
        .then((response) => {
          console.log(response.data);
        });
      return showC;
    },
    async setMinXBounds(minX) {
      const minXD = await axios
        .put("http://localhost:4000/graphs/" + this.idGraph, {
          xBounds: { lowerBound: minX, upperBound: this.maxX },
        })
        .then((response) => {
          console.log(response.data);
        });
      return minXD;
    },
    async addLegendX(legendX) {
      const legendXD = await axios
        .put("http://localhost:4000/graphs/" + this.idGraph, { xLegend: this.legendX })
        .then((response) => {
          console.log(response.data);
        });
      return legendXD;
    },
    async addLegendY(legendY) {
      const legendYD = await axios
        .put("http://localhost:4000/graphs/" + this.idGraph, { yLegend: this.legendY })
        .then((response) => {
          console.log(response.data);
        });
      return legendYD;
    },
    async addTitle(title) {
      const titleD = await axios
        .put("http://localhost:4000/graphs/" + this.idGraph, { graphLegend: this.title })
        .then((response) => {
          console.log(response.data);
        });
      return titleD;
    },
    async addColor(h) {
      let r = 0,
        g = 0,
        b = 0,
        a = 100;

      // 3 digits
      if (h.length == 4) {
        r = "0x" + h[1] + h[1];
        g = "0x" + h[2] + h[2];
        b = "0x" + h[3] + h[3];

        // 6 digits
      } else if (h.length == 9) {
        r = "0x" + h[1] + h[2];
        g = "0x" + h[3] + h[4];
        b = "0x" + h[5] + h[6];
      }

      let rC = +(+(+r));
      let gC = +(+(+g));
      let bC = +(+(+b));
      let rgb = [rC, gC, bC, a];

      const colorD = await axios
        .put("http://localhost:4000/graphs/" + this.idGraph, {
          backgroundColor: { r: rgb.rC, g: rgb.gC, b: rgb.bC, a: rgb.a },
        })
        .then((response) => {
          console.log(response.data);
        });
      return colorD;
    },
    async addMinX(minX) {
      const minXD = await axios
        .put("http://localhost:4000/graphs/" + this.idGraph, {
          xBounds: { lowerBound: this.minX, upperBound: this.maxX },
        })
        .then((response) => {
          console.log(response.data);
        });
      return minXD;
    },
    async addMinY(minY) {
      const minYD = await axios
        .put("http://localhost:4000/graphs/" + this.idGraph, {
          yBounds: { lowerBound: this.minY, upperBound: this.maxY },
        })
        .then((response) => {
          console.log(response.data);
        });
      return minYD;
    },
    async saveChange() {
      console.log(this.minX);
      await this.addLegendX(this.legendX);
      await this.addLegendY(this.legendY);
      await this.showXGrid(this.showX);
      await this.showYGrid(this.showY);
      await this.showCGrid(this.showGrid);
      await this.addTitle(this.title);
      await this.addMinX(this.minX);

      await this.addMinY(this.minY);
      //await this.addColor(this.color);
    },
    async viewGraphs(graphs) {
      await axios.get("http://localhost:4000/graphs").then((response) => {
        const graphsSet = new Set();
        const allGraphsSet = new Set();
        response.data.forEach((graph) => {
          graphsSet.add(graph.name);
          this.graphs = [...graphsSet];
          allGraphsSet.add(graph);
          allGraphs = [...allGraphsSet];
        });
      });
    },
    async saveGraphSelected(graphsSelected) {
      this.graphsS = allGraphs.filter((graph) =>
        this.graphsSelected.includes(graph.name)
      );
      this.searchGraph(this.graphsS);
    },
  }),
};
</script>
