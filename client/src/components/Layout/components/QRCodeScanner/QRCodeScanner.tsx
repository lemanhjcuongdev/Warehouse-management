import { useState } from "react";
import { Button } from "react-bootstrap";
import { OnResultFunction, QrReader } from "react-qr-reader";

function QRCodeScanner(props: { handleUpdateListData: (data: any) => void }) {
    const { handleUpdateListData } = props;
    const [hide, setHide] = useState("block");

    const handleResult: OnResultFunction = (result) => {
        if (result?.getText()) {
            const currentDetail = JSON.parse(result?.getText());
            handleUpdateListData(currentDetail);
        }
    };
    return (
        <>
            <Button
                className="mb-3"
                onClick={() => {
                    const QRCamera = document.getElementById(
                        "qr_camera"
                    ) as HTMLVideoElement;
                    if (hide === "block") {
                        QRCamera.pause();
                        setHide("none");
                    } else {
                        QRCamera.load();
                        QRCamera.play();
                        setHide("block");
                    }
                }}
            >
                {hide === "block" ? (
                    <>
                        <i className="fa-solid fa-video-slash"></i>
                        &nbsp; Tắt
                    </>
                ) : (
                    <>
                        <i className="fa-solid fa-video"></i>
                        &nbsp; Bật
                    </>
                )}{" "}
                Camera
            </Button>

            <QrReader
                constraints={{ facingMode: "user" }}
                scanDelay={300}
                videoId="qr_camera"
                onResult={handleResult}
                videoStyle={{
                    height: "auto",
                }}
                videoContainerStyle={{
                    display: hide,
                    paddingTop: "70%",
                }}
            />
        </>
    );
}

export default QRCodeScanner;
