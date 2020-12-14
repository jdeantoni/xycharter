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
            <v-img :max-height="width" :max-width="width" :src="image"></v-img>

            <v-divider></v-divider>
            <v-btn
              color="success"
              @click="
                reveal = !reveal;
                reveal ? (width = 300) : (width = 800);
                reveal ? (labelEdit = 'Close options') : (labelEdit = 'Modify options');
              "
              block
            >
              {{ labelEdit }}

              <v-icon>{{ editIcon }}</v-icon>
            </v-btn>

            <v-card v-if="reveal" elevation="11" tile>
              <v-card-text>
                <v-container fluid>
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
import { mdiAccount, mdiPencil, mdiShareVariant, mdiDelete } from "@mdi/js";
const axios = require("axios");

const gradients = [
  ["#222"],
  ["#42b3f4"],
  ["red", "orange", "yellow"],
  ["purple", "violet"],
  ["#00c6ff", "#F0F", "#FF0"],
  ["#f72047", "#ffd200", "#1feaea"],
];
export default {
  name: "View graphs",
  data: () => ({
    dialog: false,
    fill: true,
    gradient: gradients[4],
    gradients,
    idGraph: "",
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
    labelEdit: "Modify options",
    padding: 8,
    radius: 10,
    color: "",
    value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
    width: 800,
    title: "",
    async searchGraph(idSearched) {
      if (this.handle !== undefined) {
        clearInterval(this.handle);
      }
      this.handle = setInterval(() => {
        axios
          .get("http://localhost:4000/graphs/" + idSearched + "/render?type=JPG")
          .then((response) => {
            console.log(response.data.data)
            this.image = response.data.data;
          });
      }, 1000);
    },
    setGraphId(idGraph) {
      this.idGraph = idGraph;
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
        .put("http://localhost:4000/graphs/" + this.idGraph, { xBounds: {lowerBound:this.minX, upperBound:this.maxX} })
        .then((response) => {
          console.log(response.data);
        });
      return minXD;
    },
    async addMinY(minY) {
      const minYD = await axios
        .put("http://localhost:4000/graphs/" + this.idGraph, { yBounds: {lowerBound:this.minY, upperBound:this.maxY} })
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
      await this.addMinX(this.minX)
      
      await this.addMinY(this.minY)
      //await this.addColor(this.color);
    },
    
  }),
};
</script>
