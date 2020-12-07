
new Vue({
  el: '#createGraph',
  data() {
    return {
      typeOfGraph: "",
      createGraph(typeOfGraph) {
        axios.post("http://localhost:4010/graphs", req.body).then(response => {
          console.log(response.data);
        })

      }
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


