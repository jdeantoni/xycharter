<template>
  <v-container id="create-line" fluid tag="section">
    <v-row>
      <v-btn to="/" class="ma-2" color="orange darken-2" dark>
        <v-icon dark left>mdi-arrow-left</v-icon>Back
      </v-btn>
    </v-row>
    <validation-observer ref="observer" v-slot="{ invalid }">
      <form>
        <v-text-field
          v-model="name"
          :rules="nameRules"
          label="Name*"
          required
        ></v-text-field>

        <validation-provider v-slot="{ errors }" name="select" rules="required">
          <v-select
            :items="itemsTypeGraph"
            :error-messages="errors"
            label="Select a type of graph*"
            data-vv-name="select graph"
            v-model="typeGraphSelected"
            required
          ></v-select>
        </validation-provider>

        <validation-provider v-slot="{ errors }" name="dataset">
          <v-select
            v-model="dataSetSelected"
            :items="itemsDataSet"
            :error-messages="errors"
            attach
            label="Select a dataset"
            data-vv-name="select dataset"
            multiple
          ></v-select>
        </validation-provider>

        <v-btn
          class="mr-4"
          type="submit"
          @click="
            save(typeGraphSelected, dataSetSelected, name);
            snackbar = true;
          "
          :disabled="invalid"
        >
          Save
        </v-btn>
        <v-btn @click="clear"> clear </v-btn>

        <v-snackbar color="success" v-model="snackbar" :timeout="timeout">
          {{ text }}

          <template v-slot:action="{ attrs }">
            <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </form>
    </validation-observer>
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
var itemD = [];
var itemTypeG = [];
var idItemD = [];
var itemGraph = [];
axios.get("http://localhost:4000/datas").then((response) => {
  response.data.forEach((dataset) => {
    itemD.push(dataset.name);
    let name = dataset.name;
    let id = dataset.iddataset;
    idItemD.push({ name: name, id: id });
  });
});
axios.get("http://localhost:4000/graph/types").then((response) => {
  for (let i = 0; i < response.data.length; i++) {
    itemTypeG.push(response.data[i].graphtype);
  }
});

export default {
  name: "view-graphs",
  data: () => ({
    dialog: false,
    fill: true,
    gradient: gradients[4],
    gradients,
    reveal: false,
    typeGraphSelected: undefined,
    snackbar: false,
    text: "New graph " + name + " added...",
    timeout: 1500,
    itemsTypeGraph: itemTypeG,
    itemsDataSet: itemD,
    dataSetSelected: [],
    clear: "",
    editIcon: mdiPencil,
    name: "",
    nameRules: [(v) => !!v || "Name is required"],
    labelEdit: "Modify options",
    padding: 8,
    radius: 10,
    value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
    width: 800,
    save: async function (typeGraphSelected, dataSetSelected, name) {
      const graphCreation = {
        type: typeGraphSelected,
        name: name,
        description: "No description available",
      };
      axios.post("http://localhost:4000/graphs", graphCreation).then((response) => {
        axios.get("http://localhost:4000/graphs").then((response) => {
          response.data.forEach((graph) => {
            let name = graph.name;
            let id = graph.idgraph;
            itemGraph.push({ name: name, id: id });
          });
          let idDataSet=[]
          
          if (dataSetSelected !== undefined) {
            idDataSet = idItemD.filter(dataset => dataSetSelected.indexOf(dataset.name) !== -1);
          }
          let idGraph = itemGraph.find(graph => graph.name === name)
          
          if (dataSetSelected !== undefined) {
            for (let i = 0; i < idDataSet.length; i++) {
               axios.post(
                "http://localhost:4000/graphs/" + idGraph.id + "/dataSet/" + idDataSet[i].id
              );
            }
          }
        });
      });
    },
  }),
};
</script>
