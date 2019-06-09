"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const Events_1 = require("../lib/Events");
var LoadStatus;
(function (LoadStatus) {
    LoadStatus[LoadStatus["Loading"] = 0] = "Loading";
    LoadStatus[LoadStatus["Loaded"] = 1] = "Loaded";
})(LoadStatus || (LoadStatus = {}));
var EventEmittStatus;
(function (EventEmittStatus) {
    EventEmittStatus["ALLREADYLOAD"] = "ALL_READY_LOAD";
    EventEmittStatus["START"] = "TIMELAPSE_START";
    EventEmittStatus["STOP"] = "TIMELAPSE_STOP";
})(EventEmittStatus || (EventEmittStatus = {}));
class Timelapse extends react_1.Component {
    constructor(props) {
        super(props);
        this.images = null;
        this.canvas = react_1.default.createRef();
        this.intervalId = null;
        // 画像のプリロードを担当する
        this.imagePreLoader = (srcs, cb) => {
            const images = srcs.map((src, index) => {
                const img = new Image();
                // 画像のプリロードを始める
                img.src = src;
                img.onload = cb(index);
                return img;
            });
            return images;
        };
        // タイムラプスを始める
        this.enableTimelapse = () => {
            this.intervalId = setInterval(() => {
                const { renderingIndex } = this.state;
                this.drawCanvas(renderingIndex);
                this.setState(prevState => ({
                    renderingIndex: (prevState.renderingIndex < prevState.loadStatusList.length - 1) ? prevState.renderingIndex + 1 : 0
                }));
            }, this.fpsForMilisecond);
        };
        // タイムラプスを停止する
        this.disableTimelapse = () => {
            if (this.intervalId)
                clearInterval(this.intervalId);
        };
        // canvas に描画する
        this.drawCanvas = (index) => {
            if (this.images === null)
                return;
            // this.images から描画する image object を取り出す
            const img = this.images[index];
            if (img === null)
                return;
            const canvas = this.canvas.current;
            if (canvas === null)
                return;
            const ctx = canvas.getContext("2d");
            if (ctx === null)
                return;
            const { width, height } = this.props;
            // canvas に描画する
            ctx.drawImage(img, 0, 0, width, height);
        };
        this.state = {
            // 画像の読み込み状態を格納した配列
            loadStatusList: this.props.images.map(() => LoadStatus.Loading),
            // 描画する画像のインデックス
            renderingIndex: 0
        };
        // イメージのローディングが終わったら発火する
        Events_1.ee.once(EventEmittStatus.ALLREADYLOAD, this.props.preloadedCallback);
        // タイムラプス始まる
        Events_1.ee.on(EventEmittStatus.START, this.enableTimelapse);
        // タイムラプス終わる
        Events_1.ee.on(EventEmittStatus.STOP, this.disableTimelapse);
        // fps を ミリセカンドに変換する(1000/fps だと体感が一致しないため調整で4000)
        this.fpsForMilisecond = 4000 / this.props.fps;
    }
    componentDidMount() {
        // 画像のプリロードを始める
        const { images } = this.props;
        const srcs = images.map((image) => image.src);
        this.images = this.imagePreLoader(srcs, (i) => {
            // 読み込みが終われば、ステートの読み込み状態を変更する
            this.setState(prevState => {
                const newLoadStatusList = prevState.loadStatusList.concat();
                newLoadStatusList[i] = LoadStatus.Loaded;
                // イメージのローディングが終わったことを知らせるイベント
                const allReadyLoad = newLoadStatusList.every((loadStatus) => (loadStatus === LoadStatus.Loaded));
                if (allReadyLoad) {
                    Events_1.ee.emit(EventEmittStatus.ALLREADYLOAD, this.props.preloadedCallback);
                }
                return {
                    loadStatusList: newLoadStatusList
                };
            });
        });
    }
    componentDidUpdate(prevProps) {
        // プロパティから再生、停止を受け取り、処理する
        const { timelapseHandle } = this.props;
        if (timelapseHandle === prevProps.timelapseHandle)
            return;
        switch (timelapseHandle) {
            case true:
                Events_1.ee.emit(EventEmittStatus.START);
                console.log("start timelapse");
                break;
            case false:
                Events_1.ee.emit(EventEmittStatus.STOP);
                console.log("stop timelapse");
                break;
            default:
                break;
        }
    }
    render() {
        const { width, height } = this.props;
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", null,
                react_1.default.createElement("canvas", { ref: this.canvas, width: width, height: height }))));
    }
}
exports.default = Timelapse;
//# sourceMappingURL=Timelapse.js.map