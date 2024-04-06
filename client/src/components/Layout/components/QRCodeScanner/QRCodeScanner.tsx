import { useState } from "react";
import { Button } from "react-bootstrap";
import { OnResultFunction, QrReader } from "react-qr-reader";

function QRCodeScanner(props: { handleUpdateListData: (data: any) => void }) {
    const { handleUpdateListData } = props;
    const [component, setComponent] = useState<any>(true);
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
                    if (component) {
                        setComponent(undefined);
                    } else setComponent(true);
                }}
            >
                {component ? "Tắt" : "Bật"} Camera
            </Button>
            {component && (
                <QrReader
                    constraints={{ facingMode: "user" }}
                    scanDelay={300}
                    onResult={handleResult}
                    videoStyle={{
                        height: "auto",
                    }}
                    videoContainerStyle={{
                        paddingTop: "70%",
                    }}
                />
            )}
        </>
    );
}

export default QRCodeScanner;
