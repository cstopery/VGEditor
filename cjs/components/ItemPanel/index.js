"use strict";

var _interopRequireDefault = require("/Users/chris/Workspace/VGEditor/node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Item", {
  enumerable: true,
  get: function get() {
    return _Item.default;
  }
});
exports.default = void 0;

var _Item = _interopRequireDefault(require("./Item"));

var _default = {
  name: 'ItemPanel',
  created: function created() {
    this.bindEvent();
  },
  beforeDestroy: function beforeDestroy() {
    document.removeEventListener('mouseup', this.handleMouseUp);
  },
  methods: {
    bindEvent: function bindEvent() {
      var _this = this;

      this.root.handleAfterAddPage(function (_ref) {
        var page = _ref.page;
        _this.page = page;
        document.addEventListener('mouseup', _this.handleMouseUp);
      });
    },
    handleMouseUp: function handleMouseUp() {
      this.page.cancelAdd();
    }
  },
  inject: ['root'],
  render: function render() {
    var h = arguments[0];
    return h("div", [this.$scopedSlots.default ? this.$scopedSlots.default() : null]);
  }
};
exports.default = _default;