import { useState } from "react";
import { Button } from "react-bootstrap";
import { OnResultFunction, QrReader } from "react-qr-reader";

function QRCodeScanner(props: { handleUpdateListData: (data: any) => void }) {
    const { handleUpdateListData } = props;
    const [show, setShow] = useState("block");

    const handleResult: OnResultFunction = (result) => {
        if (result?.getText()) {
            const currentDetail = JSON.parse(result?.getText());
            handleUpdateListData(currentDetail);
        }
    };

    const handleToggleCamera = async () => {
        const QRCamera = document.getElementById(
            "qr_camera"
        ) as HTMLVideoElement;

        if (show === "block") {
            setShow("none");
        } else {
            setShow("block");
        }
    };

    return (
        <>
            <Button className="mb-3" onClick={handleToggleCamera}>
                {show === "block" ? (
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

            {show === "block" && (
                <QrReader
                    constraints={{ facingMode: "user" }}
                    scanDelay={300}
                    videoId="qr_camera"
                    onResult={handleResult}
                    videoStyle={{
                        height: "auto",
                    }}
                    videoContainerStyle={{
                        display: show,
                        paddingTop: "70%",
                    }}
                />
            )}
        </>
    );
}

export default QRCodeScanner;
