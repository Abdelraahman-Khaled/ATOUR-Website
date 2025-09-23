import BookingAPI from "api/bookingApi";
import CustomModal from "Components/CustomModal/CustomModal";
import { useLanguage } from "Components/Languages/LanguageContext";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import content from "./translates"
import translations from "Components/Languages/translations";

const GiftModal = ({ gift }) => {
    const iframeRef = useRef(null);
    const paymentProcessed = useRef(false);
    const [showModal, setShowModal] = useState(false);
    const [deliveryMethod, setDeliveryMethod] = useState("delivery");
    const [quantity, setQuantity] = useState(1);
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [paymentUrl, setPaymentUrl] = useState(null);
    const [paymentWay, setPaymentWay] = useState("online");
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [deliveryCost, setDeliveryCost] = useState(null);
    const { currentLanguage } = useLanguage();
    const navigate = useNavigate();
    const isRTL = currentLanguage === "ar";
    console.log("gift", gift);



    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const processPaymentResponse = useCallback(async (chargeId) => {
        if (paymentProcessed.current) return;
        paymentProcessed.current = true;

        try {
            const response = await BookingAPI.getPaymentStatus("gift-payment", chargeId);

            if (response.data?.status === "CAPTURED") {
                toast.success(content.paymentSuccess[currentLanguage]);
                navigate("/reservations");
            } else if (response.data?.status === "DECLINED") {
                toast.error(content.paymentFailed[currentLanguage]);
            } else if (response.data?.status === "CANCELLED") {
                toast.error(content.paymentCancelled[currentLanguage]);
            }
        } catch (error) {
            console.error("Payment verification failed:", error);
            toast.error(content.paymentFailed[currentLanguage]);
        } finally {
            setPaymentUrl(null);
            handleCloseModal();
        }
    }, [currentLanguage]);

    const handlePaymentMessage = useCallback((event) => {
        const allowedOrigins = [
            "https://checkout.tap.company",
            "https://authentication.staging.tap.company",
            "http://localhost:3000",
        ];

        if (!allowedOrigins.includes(event.origin)) {
            console.warn("Blocked unknown origin:", event.origin);
            return;
        }

        const { event: eventName, data } = event.data;

        if (eventName === "checkout:onSuccess") {
            processPaymentResponse(data.chargeId);
        } else if (eventName === "checkout:onFailure" || eventName === "checkout:onClose" || eventName === "checkout:onError") {
            setPaymentUrl(null);
            toast.warn(content.paymentCancelled[currentLanguage]);
            handleCloseModal();
        }
    }, [processPaymentResponse]);

    const buttonActiveBook = async () => {
        if (deliveryMethod === "delivery" && (!address || !phoneNumber || !selectedCountry || !selectedCity)) {
            toast.error(content.errors.missingFields[currentLanguage]);
            return;
        }

        setIsLoading(true);
        try {
            const response = await BookingAPI.bookGift({
                giftId: gift.id,
                paymentWay,
                quantity,
                deliveryWay: deliveryMethod,
                deliveryAddress: deliveryMethod === "delivery" ? address : "",
                number: deliveryMethod === "delivery" ? phoneNumber : "",
                location: deliveryMethod === "delivery" ? address : "",
                selectedCity: deliveryMethod === "delivery" ? selectedCity : "",
            });

            if (response.success) {
                if (paymentWay === "cash") {
                    toast.success(content.paymentSuccess[currentLanguage]);
                    navigate("/reservations");
                } else if (response.data?.data?.transaction?.url) {
                    paymentProcessed.current = false;
                    setPaymentUrl(response.data.data.transaction.url);
                    toast.success(content.paymentInitiated[currentLanguage]);
                }
            } else {
                toast.error(response.data?.response?.message || content.paymentFailed[currentLanguage]);
            }
        } catch (error) {
            console.error("Booking failed:", error);
            toast.error(error.response?.data?.message || content.paymentFailed[currentLanguage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        buttonActiveBook();
    };

    useEffect(() => {
        window.addEventListener("message", handlePaymentMessage);
        return () => {
            window.removeEventListener("message", handlePaymentMessage);
        };
    }, [handlePaymentMessage]);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await BookingAPI.getCountries();
                if (response.success && Array.isArray(response.data)) {
                    setCountries(response.data);

                } else {
                    setCountries([]);
                }
            } catch (error) {
                console.error("Failed to fetch countries:", error);
                toast.error("Failed to load countries.");
            }
        };
        fetchCountries();
    }, []);

    useEffect(() => {
        if (selectedCountry) {
            // console.log("Fetching cities for country ID:", selectedCountry);
            const fetchCities = async () => {
                try {
                    const response = await BookingAPI.getCitiesByCountryId(selectedCountry);
                    if (response.success && Array.isArray(response.data)) {
                        setCities(response.data);

                    } else {
                        setCities([]);
                    }
                } catch (error) {
                    console.error("Failed to fetch cities:", error);
                    toast.error("Failed to load cities.");
                }
            };
            fetchCities();
        } else {
            setCities([]);
            setSelectedCity("");
        }
    }, [selectedCountry]);

    useEffect(() => {
        if (selectedCity && gift?.vendor?.id) {
            const fetchDeliveryCost = async () => {
                try {
                    // Assuming BookingAPI has a method to get delivery cost
                    const response = await BookingAPI.getDeliveryCost(selectedCity, gift.vendor.id);
                    if (response.success) {
                        console.log("Delivery Cost:", response.data);
                        setDeliveryCost(response.data.cost); // Assuming the cost is in response.data.cost
                    } else {
                        console.error("Failed to fetch delivery cost:", response.data);
                        toast.error("Failed to load delivery cost.");
                    }
                } catch (error) {
                    console.error("Error fetching delivery cost:", error);
                    toast.error("Error loading delivery cost.");
                }
            };
            fetchDeliveryCost();
        }
    }, [selectedCity, gift?.vendor?.id]);
    console.log(selectedCity);

    return (
        <div className={`text-${isRTL ? "right" : "left"} `}>
            {paymentUrl && (
                <CustomModal
                    show={!!paymentUrl}
                    onHide={() => setPaymentUrl(null)}
                    title={content.paymentInitiated[currentLanguage]}
                    newClass={"modal-payment"}
                >
                    <iframe
                        src={paymentUrl}
                        ref={iframeRef}
                        id="paymentIframe"
                        style={{ width: "100%", height: "500px", border: "none" }}
                        title="Payment Gateway"
                        allow="payment"
                    />
                </CustomModal>
            )}

            <button onClick={handleOpenModal} className="btn-main w-100">
                {content.bookNow[currentLanguage]}
            </button>

            <CustomModal
                show={showModal}
                onHide={handleCloseModal}
                title={content.orderDetails[currentLanguage]}
                newClass="modal-available modal-width-content"
            >
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="quantity">
                            <Form.Label>{content.quantity[currentLanguage]}</Form.Label>
                            <div className="d-flex align-items-center gap-3">
                                <Button
                                    className="btn-close-icon"
                                    variant="outline-secondary"
                                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                                >
                                    -
                                </Button>
                                <span>{quantity}</span>
                                <Button
                                    className="btn-close-icon"
                                    variant="outline-secondary"
                                    onClick={() => setQuantity((prev) => prev + 1)}
                                >
                                    +
                                </Button>
                            </div>
                        </Form.Group>

                        <Form.Group controlId="deliveryMethod" className="mt-3">
                            <Form.Label className="text-black">{content.deliveryMethod[currentLanguage]}</Form.Label>
                            <Form.Check
                                className="d-flex gap-2 mt-1"
                                type="radio"
                                label={content.byMyself[currentLanguage]}
                                name="deliveryMethod"
                                value="myself"
                                checked={deliveryMethod === "myself"}
                                onChange={(e) => setDeliveryMethod(e.target.value)}
                            />
                            <Form.Check
                                className="d-flex gap-2 mt-2"
                                type="radio"
                                label={content.delivery[currentLanguage]}
                                name="deliveryMethod"
                                value="delivery"
                                checked={deliveryMethod === "delivery"}
                                onChange={(e) => setDeliveryMethod(e.target.value)}
                            />
                        </Form.Group>

                        {deliveryMethod === "delivery" && (
                            <>
                                <Form.Group controlId="address" className="mt-3">
                                    <Form.Label>{content.address[currentLanguage]}</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder={content.address[currentLanguage]}
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="phoneNumber" className="mt-3">
                                    <Form.Label>{content.phoneNumber[currentLanguage]}</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        placeholder={content.phoneNumber[currentLanguage]}
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="countrySelect" className="mt-3">
                                    <Form.Label>{content.country[currentLanguage]}</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={selectedCountry}
                                        onChange={(e) => {
                                            setSelectedCountry(e.target.value);
                                            // console.log("Selected Country ID:", e.target.value);
                                        }}
                                        required
                                    >
                                        <option value="">{content.selectCountry[currentLanguage]}</option>
                                        {countries.map((country) => (
                                            <option key={country.id} value={country.id}>
                                                {country.title}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                                {selectedCountry && (
                                    <Form.Group controlId="citySelect" className="mt-3">
                                        <Form.Label>{content.city[currentLanguage]}</Form.Label>
                                        <Form.Control
                                            as="select"
                                            value={selectedCity}
                                            onChange={(e) => setSelectedCity(e.target.value)}
                                            required
                                        >
                                            <option value="">{content.selectCity[currentLanguage]}</option>
                                            {cities.map((city) => (
                                                <option key={city.id} value={city.id}>
                                                    {city.title}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                )}
                            </>
                        )}

                        {deliveryMethod === "delivery" && deliveryCost !== null && (
                            <Form.Group controlId="deliveryCost" className="mt-3">
                                <Form.Label>{content.deliveryCost[currentLanguage]}</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={`${deliveryCost} ${currentLanguage === "ar" ? "ريال" : "SAR"}`}
                                    readOnly
                                />
                            </Form.Group>
                        )}

                        {gift.pay_later == true && (
                            <Form.Group controlId="paymentWay" className="gap-3 mx-1 my-3">
                                <Form.Label className="text-black">{content.choosePaymentWay[currentLanguage]}</Form.Label>
                                <Form.Check
                                    className="d-flex gap-2"
                                    type="radio"
                                    label={content.cash[currentLanguage]}
                                    name="paymentWay"
                                    value="cash"
                                    checked={paymentWay === "cash"}
                                    onChange={(e) => setPaymentWay(e.target.value)}
                                />
                                <Form.Check
                                    className="d-flex gap-2 my-2"
                                    type="radio"
                                    label={content.online[currentLanguage]}
                                    name="paymentWay"
                                    value="online"
                                    checked={paymentWay === "online"}
                                    onChange={(e) => setPaymentWay(e.target.value)}
                                />
                            </Form.Group>
                        )}

                        <button
                            type="submit"
                            className="mt-3 btn-main w-100"
                            disabled={isLoading}
                        >
                            {isLoading
                                ? content.processing[currentLanguage]
                                : content.submit[currentLanguage]}
                        </button>
                    </Form>
                </Modal.Body>
            </CustomModal>
        </div>
    );
};

export default GiftModal;