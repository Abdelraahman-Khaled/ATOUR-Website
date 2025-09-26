import React, { useState } from 'react';
import CustomModal from '../../CustomModal/CustomModal';
import "./mainSlider.css"

export const Thumb = ({ selected, onClick, imgSrc, images, setShowModal, showModal }) => {

    return (
        <>
            <div
                className={`embla-thumbs__slide  ${selected ? 'is-selected' : ''}`}
                onClick={onClick}
            >
                <img
                    className="embla-thumbs__slide__img "
                    src={imgSrc}
                    alt="Thumbnail"
                />
            </div>

            <CustomModal
                show={showModal}
                onHide={() => setShowModal(false)}
                title={"الصور"}
                newClass={"images-modal "}
            >
                <div className='d-flex flex-wrap flex-row justify-content-between  w-100'>
                    {
                        images?.map((src, index) => (
                            <div
                                key={index}
                                className='col-md-6 col-lg-4 col-12  rounded-1  p-2'>
                                <img
                                    src={src}
                                    alt="Thumbnail"
                                    className='w-100  h-100 rounded-2'
                                />
                            </div>
                        ))
                    }
                </div>
            </CustomModal>
        </>
    );
};
