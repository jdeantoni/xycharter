
new Vue({
  el: '#modifyGraph',
  data() {
    return {
      isDropdown2Visible: false,
      selectedGraphOptions: [],
      titleGraph: "",
      legendX: "",
      legendY: "",
      color: "",
      lowerBoundX: "0.0",
      upperBoundX: "200.0",
      upperBoundY: "200.0",
      lowerBoundY: "0.0",
      componentKey: 0,
      image: "data:image/png;base64,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",
      idSearched: "",
      searchGraph(idSearched) {
        if(this.handle!==undefined){
          clearInterval(this.handle)
        }
        this.handle = setInterval(() => {
          this.image = "http://localhost:4040/graphs/" + new Date().getTime() + "/" + idSearched + "?type=JPG"
        }
          , 1000)

      },
      addLegendX(legendX) {
        axios.put("http://localhost:4010/graphsChara/" + this.idSearched, { "characteristics": "{\"xLegend\": \" " + legendX + "\"}" }).then(response => {
          console.log(response.data);

        })

      },
      addLegendY(legendY) {
        axios.put("http://localhost:4010/graphsChara/" + this.idSearched, { "characteristics": "{\"yLegend\": \" " + legendY + "\"}" }).then(response => {
          console.log(response.data);

        })

      },
      show() {
        this.selectedGraphOptions.forEach(opt => {
          if (opt === "showX") {
            axios.put("http://localhost:4010/graphsChara/" + this.idSearched, { "characteristics": "{\"" + opt + "\": \"" + true + "\"}" }).then(response => {
              console.log(response.data);

            });
          }
          if (opt === "showY") {
            axios.put("http://localhost:4010/graphsChara/" + this.idSearched, { "characteristics": "{\"" + opt + "\": \"" + true + "\"}" }).then(response => {
              console.log(response.data);

            });
          }

          if (opt === "showGrid") {
            axios.put("http://localhost:4010/graphsChara/" + this.idSearched, { "characteristics": "{\"" + opt + "\": \"" + true + "\"}" }).then(response => {
              console.log(response.data);

            });
          }

        });


      },
      addTitle(title) {

        axios.put("http://localhost:4010/graphsChara/" + this.idSearched, { "characteristics": "{\"graphLegend\": \" " + title + "\"}" })

      },
      setLowerBoundX(lowerBandX) {
        axios.put("http://localhost:4010/graphsChara/" + this.idSearched,
          { "characteristics": "{\"xBounds\": {\"lowerBound\":\"" + lowerBandX + "\",\"upperBound\":\"" + this.upperBoundX + "\"}}" })
          

      },
      setUpperBoundX(upperBoundX) {

        axios.put("http://localhost:4010/graphsChara/" + this.idSearched,
          { "characteristics": "{\"xBounds\": {\"lowerBound\":\"" + this.lowerBoundX + "\",\"upperBound\":\"" + upperBoundX + "\"}}" })
          

      },
      setLowerBoundY(lowerBandY) {

        axios.put("http://localhost:4010/graphsChara/" + this.idSearched,
          { "characteristics": "{\"yBounds\": {\"lowerBound\":\"" + lowerBandY + "\",\"upperBound\":\"" + this.upperBoundY + "\"}}" })
          

      },
      setUpperBoundY(upperBoundY) {

        axios.put("http://localhost:4010/graphsChara/" + this.idSearched,
          { "characteristics": "{\"yBounds\": {\"lowerBound\":\"" + this.lowerBoundY + "\",\"upperBound\":\"" + upperBoundY + "\"}}" })
          

      },
      changeColor(h) {
        let r = 0, g = 0, b = 0, a = 100;

        // 3 digits
        if (h.length == 4) {
          r = "0x" + h[1] + h[1];
          g = "0x" + h[2] + h[2];
          b = "0x" + h[3] + h[3];

          // 6 digits
        } else if (h.length == 7) {
          r = "0x" + h[1] + h[2];
          g = "0x" + h[3] + h[4];
          b = "0x" + h[5] + h[6];
        }


        let rC = + +r;
        let gC = + +g;
        let bC = + +b;
        let rgb = [rC, gC, bC, a]
        console.log(rgb)

        let chara = { "characteristics": "{\"backgroundColor\": {\"r\":\"" + rgb[0] + "\",\"g\":\"" + rgb[1] + "\",\"b\":\"" + rgb[2] + "\",\"a\":\"" + rgb[3] + "\"}}" }
        axios.put("http://localhost:4010/graphsChara/" + this.idSearched, chara);

      },
      options: [
        { text: 'Show X', value: 'showX' },
        { text: 'Show Y', value: 'showY' },
        { text: 'Show grid', value: 'showGrid' }
      ]
    }
  },

  beforeMount: function () {
    window.addEventListener("beforeunload", event => {
      event.preventDefault()
      // Chrome requires returnValue to be set.
      event.returnValue = ""
    })
  },

  mounted: function () {
    this.$root.$on('bv::dropdown::show', bvEvent => {
      if (bvEvent.componentId === 'dropdown-dropright-1') {
        this.isDropdown2Visible = true;
      }
    })
    this.$root.$on('bv::dropdown::hide', bvEvent => {
      if (bvEvent.componentId === 'dropdown-dropright-1') {
        this.isDropdown2Visible = false;
      }
      if (this.isDropdown2Visible) {
        bvEvent.preventDefault()
      }
    })
  }


})


