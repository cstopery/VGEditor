import "core-js/modules/es6.number.constructor";
import G6 from '@antv/g6';

require('@antv/g6/build/plugin.tool.minimap');

import { MINIMAP_CONTAINER } from '@common/constants';
export default {
  name: 'Minimap',
  created: function created() {
    this.bindEvent();
  },
  mounted: function mounted() {
    this.init().then(this.bindPage);
  },
  beforeDestroy: function beforeDestroy() {
    this.minimap && this.minimap.destroy();
  },
  methods: {
    bindEvent: function bindEvent() {
      this.root.handleAfterAddPage(this.bindPage);
    },
    init: function init() {
      var _this = this;

      return new Promise(function (resolve) {
        _this.containerId = "".concat(MINIMAP_CONTAINER, "_").concat(_this.root.editor.id);
        var container = _this.container || _this.containerId;
        var width = _this.width,
            height = _this.height,
            viewportWindowStyle = _this.viewportWindowStyle,
            viewportBackStyle = _this.viewportBackStyle;

        _this.$nextTick(function () {
          var _document$getElementB = document.getElementById(container),
              clientWidth = _document$getElementB.clientWidth,
              clientHeight = _document$getElementB.clientHeight;

          _this.minimap = new G6.Components.Minimap({
            container: container,
            width: width || clientWidth,
            height: height || clientHeight,
            viewportWindowStyle: viewportWindowStyle,
            viewportBackStyle: viewportBackStyle
          });

          var currentPage = _this.getCurrentPage();

          _this.minimap.getGraph = function () {
            return currentPage.getGraph();
          };

          resolve();
        });
      });
    },
    bindPage: function bindPage() {
      var currentPage = this.getCurrentPage();

      if (!this.minimap || !currentPage) {
        return;
      }

      var graph = currentPage.getGraph();
      this.minimap.bindGraph(graph);
      this.minimap.debounceRender();
    },
    getCurrentPage: function getCurrentPage() {
      var currentPage = this.root.editor.getCurrentPage();
      return currentPage;
    }
  },
  inject: ['root'],
  props: {
    container: String,
    width: Number,
    height: Number,
    viewportWindowStyle: Object,
    viewportBackStyle: Object
  },
  data: function data() {
    return {
      containerId: '',
      minimap: null
    };
  },
  render: function render() {
    var h = arguments[0];
    return h("div", {
      "attrs": {
        "id": this.containerId
      }
    });
  }
};