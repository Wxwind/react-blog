import { useState, useRef, useEffect, FC } from "react";
import Webcam from "react-webcam";
import * as bodyPix from "@tensorflow-models/body-pix";
import styles from "./styles.module.scss";
import "@tensorflow/tfjs";

export const FacePhoto: FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [originalImgSrc, setOriginalImgSrc] = useState<string | null>(null);
  const [processedImgSrc, setProcessedImgSrc] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [model, setModel] = useState<bodyPix.BodyPix | null>(null);
  const [modelLoading, setModelLoading] = useState(true);
  const [modelProgress, setModelProgress] = useState(0);

  // 加载TensorFlow模型
  useEffect(() => {
    const loadModel = async () => {
      try {
        const model = await bodyPix.load({
          architecture: "MobileNetV1",
          outputStride: 16,
          multiplier: 0.75,
          quantBytes: 2,
        });
        setModel(model);
      } catch (error) {
        console.error("加载模型失败:", error);
      } finally {
        setModelLoading(false);
      }
    };

    // 模拟加载进度
    const progressInterval = setInterval(() => {
      setModelProgress((prev) => {
        if (prev < 90) return prev + 10;
        return prev;
      });
    }, 500);

    loadModel();

    return () => clearInterval(progressInterval);
  }, []);

  // 启动摄像头
  const startCamera = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      setIsCameraOn(true);
    } catch (err) {
      console.error("无法访问摄像头: ", err);
      alert("无法访问摄像头，请检查权限设置");
    }
  };

  // 关闭摄像头
  const stopCamera = () => {
    setIsCameraOn(false);
  };

  // 拍照
  const capturePhoto = async () => {
    if (!webcamRef.current || modelLoading) return;
    const imageSrc = webcamRef.current.getScreenshot({ width: 1080, height: 720 });
    setOriginalImgSrc(imageSrc);
    setProcessedImgSrc(null);
  };

  // 处理照片 - 使用AI模型替换背景
  const processPhoto = async () => {
    if (!originalImgSrc || modelLoading || !model) return;

    setIsProcessing(true);

    try {
      const img = new Image();
      img.src = originalImgSrc;

      img.onload = async () => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;

        // 设置canvas为原始图像尺寸
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;

        // 绘制原始图像（保持原尺寸）
        ctx.drawImage(img, 0, 0);

        // 使用BodyPix模型进行分割（提高精度）
        const segmentation = await model.segmentPerson(canvas, {
          flipHorizontal: false,
          internalResolution: "full", // 使用全尺寸处理
          segmentationThreshold: 0.6, // 降低阈值包括更多边缘
          maxDetections: 1,
        });

        // 修复toMask函数参数（关键修复）
        const mask = bodyPix.toMask(
          segmentation,
          { r: 0, g: 0, b: 255, a: 255 }, // 前景颜色（黑色不透明）
          { r: 0, g: 255, b: 0, a: 0 }, // 背景颜色（完全透明）
          false // drawContour（不绘制轮廓）
        );

        const maskImageData = ctx.createImageData(canvas.width, canvas.height);
        maskImageData.data.set(mask.data);

        // 创建临时画布处理合成
        const tempCanvas = document.createElement("canvas");
        const tempCtx = tempCanvas.getContext("2d")!;
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;

        // 1. 应用掩码保留人像
        tempCtx.globalCompositeOperation = "source-over";
        tempCtx.putImageData(maskImageData, 0, 0);

        // 2. 绘制原始图像到有掩码的区域
        tempCtx.globalCompositeOperation = "source-in";
        tempCtx.drawImage(img, 0, 0);

        // 3. 无掩码的区域绘制蓝色背景（完整尺寸）
        tempCtx.globalCompositeOperation = "destination-over";
        tempCtx.fillStyle = "rgb(0, 0, 255)";
        tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

        // 4. 重置合成操作
        tempCtx.globalCompositeOperation = "source-over";

        // 保存处理结果
        const processedImg = tempCanvas.toDataURL("image/jpeg");
        setProcessedImgSrc(processedImg);
        setIsProcessing(false);
      };
    } catch (error) {
      console.error("图像处理失败:", error);
      setIsProcessing(false);
    }
  };

  return (
    <div className={styles["app"]}>
      <div className={styles["header"]}>
        <h1>AI背景替换工具</h1>
        <p>使用TensorFlow.js智能识别人体轮廓，替换为蓝色背景</p>
      </div>

      {modelLoading ? (
        <div className={styles["model-loading"]}>
          <div className={styles["loading-bar"]}>
            <div className={styles["loading-progress"]} style={{ width: `${modelProgress}%` }}></div>
          </div>
          <p>正在加载AI模型... {modelProgress}%</p>
          <p>首次加载可能需要较长时间(约30秒)，请耐心等待</p>
          <div className={styles["model-info"]}>
            <p>使用技术：TensorFlow.js + BodyPix模型</p>
            <p>模型大小：约10MB（已在下载中）</p>
          </div>
        </div>
      ) : (
        <div className={styles["app-container"]}>
          <div className={styles["camera-container"]}>
            {isCameraOn ? (
              <div className={styles["camera-preview"]}>
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={{ facingMode: "user" }}
                  className={styles["webcam"]}
                />
                <div className={styles["controls"]}>
                  <button onClick={capturePhoto} disabled={isProcessing}>
                    拍照
                  </button>
                  <button onClick={stopCamera}>关闭摄像头</button>
                </div>
              </div>
            ) : (
              <div className={styles["camera-off"]}>
                <button onClick={startCamera}>开启摄像头</button>
                <p>请在光线充足的环境下拍照</p>
                <p>支持复杂背景下的智能分割</p>
              </div>
            )}

            {/* 隐藏的画布用于处理图像 */}
            <canvas ref={canvasRef} style={{ display: "none" }} />
          </div>

          <div className={styles["results-container"]}>
            <div className={styles["result-card"]}>
              <h2>原始照片</h2>
              {originalImgSrc ? (
                <img src={originalImgSrc} alt="原始照片" className={styles["original-photo"]} />
              ) : (
                <div className={styles["placeholder"]}>
                  <div className={styles["placeholder-content"]}>等待拍照...</div>
                </div>
              )}
            </div>

            <div className={styles["process-btn-container"]}>
              <button
                onClick={processPhoto}
                disabled={!originalImgSrc || isProcessing}
                className={styles["process-btn"]}
              >
                {isProcessing ? (
                  <div className={styles["processing"]}>
                    <div className={styles["spinner"]}></div>
                    AI处理中...
                  </div>
                ) : (
                  "👉 替换为蓝色背景 👈"
                )}
              </button>
            </div>

            <div className={styles["result-card"]}>
              <h2>处理后照片</h2>
              {processedImgSrc ? (
                <div className={styles["result-content"]}>
                  <img src={processedImgSrc} alt="处理后照片" className={styles["processed-photo"]} />
                  <a href={processedImgSrc} download="blue-background-photo.jpg" className={styles["download-btn"]}>
                    下载照片
                  </a>
                </div>
              ) : (
                <div className={styles["placeholder"]}>
                  <div className={styles["placeholder-content blue"]}>蓝色背景预览</div>
                  <p className={styles["placeholder-text"]}>照片处理后将会显示在这里</p>
                </div>
              )}
            </div>
          </div>

          <div className={styles["tech-info"]}>
            <h3>技术说明</h3>
            <div className={styles["tech-points"]}>
              <div className={styles["tech-card"]}>
                <div className={styles["tech-icon"]}>🤖</div>
                <h4>AI人体分割</h4>
                <p>使用TensorFlow.js BodyPix模型精准识别照片中的人物轮廓</p>
              </div>
              <div className={styles["tech-card"]}>
                <div className={styles["tech-icon"]}>🎯</div>
                <h4>复杂背景处理</h4>
                <p>可处理各种复杂背景，无需绿幕也能获得专业效果</p>
              </div>
              <div className={styles["tech-card"]}>
                <div className={styles["tech-icon"]}>⚡</div>
                <h4>浏览器端处理</h4>
                <p>照片处理完全在浏览器中完成，保护用户隐私</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
