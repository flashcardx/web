import PropTypes from 'prop-types';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InfiniteScroll = function (_React$Component) {
    _inherits(InfiniteScroll, _React$Component);

    function InfiniteScroll(props) {
        _classCallCheck(this, InfiniteScroll);

        var _this = _possibleConstructorReturn(this, (InfiniteScroll.__proto__ || Object.getPrototypeOf(InfiniteScroll)).call(this, props));

        _this.handleScroll = _this.handleScroll.bind(_this);
        return _this;
    }

    _createClass(InfiniteScroll, [{
        key: 'componentDidMount',
        value: function () {
            function componentDidMount() {
                var position = this.props.position;


                if (!!position) {
                    this.setScrollPosition();
                }
            }

            return componentDidMount;
        }()
    }, {
        key: 'componentDidUpdate',
        value: function () {
            function componentDidUpdate(prevProps) {
                var position = this.props.position;


                if (!!position && position !== prevProps.position) {
                    this.setScrollPosition();
                }
            }

            return componentDidUpdate;
        }()
    }, {
        key: 'setScrollPosition',
        value: function () {
            function setScrollPosition() {
                var _props = this.props,
                    position = _props.position,
                    horizontal = _props.horizontal;


                if (horizontal) {
                    this.refs.scroller.scrollLeft = position;
                } else {
                    this.refs.scroller.scrollTop = position;
                }
            }

            return setScrollPosition;
        }()
    }, {
        key: 'handleScroll',
        value: function () {
            function handleScroll() {
                var _refs$scroller = this.refs.scroller,
                    firstChild = _refs$scroller.firstChild,
                    lastChild = _refs$scroller.lastChild,
                    scrollTop = _refs$scroller.scrollTop,
                    scrollLeft = _refs$scroller.scrollLeft,
                    offsetTop = _refs$scroller.offsetTop,
                    offsetLeft = _refs$scroller.offsetLeft,
                    offsetHeight = _refs$scroller.offsetHeight,
                    offsetWidth = _refs$scroller.offsetWidth;
                var _props2 = this.props,
                    horizontal = _props2.horizontal,
                    onScroll = _props2.onScroll,
                    onReachRight = _props2.onReachRight,
                    onReachLeft = _props2.onReachLeft,
                    onReachTop = _props2.onReachTop,
                    onReachBottom = _props2.onReachBottom;


                var top = firstChild.offsetTop;
                var left = firstChild.offsetLeft;
                var bottom = lastChild.offsetTop + lastChild.offsetHeight;
                var right = lastChild.offsetLeft + lastChild.offsetWidth;
                var scrolledUp = scrollTop + offsetTop;
                var scrolledLeft = scrollLeft + offsetLeft;
                var scrolledDown = scrolledUp + offsetHeight;
                var scrolledRight = scrolledLeft + offsetWidth;
                var scrolledTo = 0;

                if (horizontal) {
                    if (scrolledRight >= right) {
                        onReachRight();
                    } else if (scrolledLeft <= left) {
                        onReachLeft();
                    }
                    scrolledTo = scrollLeft;
                } else {
                    if (scrolledDown >= bottom) {
                        onReachBottom();
                    } else if (scrolledUp <= top) {
                        onReachTop();
                    }
                    scrolledTo = scrollTop;
                }

                onScroll(scrolledTo);
            }

            return handleScroll;
        }()
    }, {
        key: 'render',
        value: function () {
            function render() {
                var whiteSpace = this.props.horizontal ? 'nowrap' : 'normal';

                return _react2['default'].createElement(
                    'div',
                    {
                        ref: 'scroller',
                        style: {
                            overflow: 'auto',
                            height: 'inherit',
                            width: 'inherit',
                            WebkitOverflowScrolling: 'inherit',
                            whiteSpace: whiteSpace
                        },
                        onScroll: this.handleScroll
                    },
                    this.props.children
                );
            }

            return render;
        }()
    }]);

    return InfiniteScroll;
}(_react2['default'].Component);

InfiniteScroll.propTypes = {
    children: PropTypes.node.isRequired,
    horizontal: PropTypes.bool,
    onReachBottom: PropTypes.func,
    onReachTop: PropTypes.func,
    onReachLeft: PropTypes.func,
    onReachRight: PropTypes.func,
    onScroll: PropTypes.func,
    position: PropTypes.number
};

InfiniteScroll.defaultProps = {
    onReachBottom: function () {
        function onReachBottom(f) {
            return f;
        }

        return onReachBottom;
    }(),
    onReachTop: function () {
        function onReachTop(f) {
            return f;
        }

        return onReachTop;
    }(),
    onReachLeft: function () {
        function onReachLeft(f) {
            return f;
        }

        return onReachLeft;
    }(),
    onReachRight: function () {
        function onReachRight(f) {
            return f;
        }

        return onReachRight;
    }(),
    onScroll: function () {
        function onScroll(f) {
            return f;
        }

        return onScroll;
    }(),
    position: 0
};

export default InfiniteScroll;