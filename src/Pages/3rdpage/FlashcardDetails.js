import React, { useState } from "react";
import { BsArrowLeft, BsShare, BsDownload, BsPrinter } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";
import { BiCopy } from "react-icons/bi";
import { CgClose } from "react-icons/cg";

const FlashcardDetails = () => {
  const flashcardData = useSelector((state) => state.Reducer);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const incrementCard = (step, cards) => {
    if (cards.length - 1 > currentCardIndex) {
      setCurrentCardIndex(currentCardIndex + step);
    } else {
      setCurrentCardIndex(0);
    }
  };

  const decrementCard = (step, cards) => {
    if (currentCardIndex <= 0) {
      setCurrentCardIndex(cards.length - 1);
    } else if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex + step);
    }
  };

  const [alertColor, setAlertColor] = useState("initial");
  const [shareUrl, setShareUrl] = useState();
  const copyUrlToClipboard = () => {
    navigator.clipboard.writeText(document.location.href);
    setAlertColor("green");
  };

  const [shareDisplay, setShareDisplay] = useState("none");
  const openShareModal = () => {
    setShareDisplay("flex");
    setShareUrl(`${document.location.href}`);
  };
  const closeShareModal = () => {
    setShareDisplay("none");
  };

  return (
    <div>
      <div className="mb-12">
        {flashcardData.groupData.map((group, groupIndex) => {
          return groupIndex === flashcardData.showNum ? (
            <div key={groupIndex}>
              <div>
                <Link
                  to="/myflashcard"
                  className="flex items-center font-bold text-black"
                >
                  <BsArrowLeft className="text-lg mr-3" />
                  <span>{group.group.groupName}</span>
                </Link>
                <p className="text-sm text-gray-600 pl-8 pt-4 text-justify">
                  {group.group.description}
                </p>
              </div>

              <div className="flex flex-col items-center justify-center lg:items-start my-11 lg:flex-row lg:justify-between sm:items-center sm:justify-center sm:flex-col mb-14">
                <div className="w-full bg-white rounded-md px-2 shadow-lg lg:w-1/5 sm:w-full ">
                  <p className="text-sm px-5 py-2 text-gray-300">Flashcards</p>
                  <hr className="bg-gray-300" style={{ height: "1px" }} />
                  <h3 className="font-extrabold px-5 py-2 text-red-500">
                    Cards list
                  </h3>
                  <ul>
                    {group.state.map((card, cardIndex) => (
                      <li
                        key={cardIndex}
                        style={
                          currentCardIndex === cardIndex
                            ? { color: "red" }
                            : { color: "initial" }
                        }
                        onClick={() => setCurrentCardIndex(cardIndex)}
                        className={`px-5 py-2 cursor-pointer ${
                          currentCardIndex === cardIndex
                            ? "text-red-500 font-bold"
                            : ""
                        }`}
                      >
                        {cardIndex + 1}. {card.term}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="w-full lg:w-2/4 sm:w-full">
                  {group.state.map((card, cardIndex) =>
                    currentCardIndex === cardIndex ? (
                      <div
                        key={cardIndex}
                        className="w-full flex flex-col justify-between px-5 py-9 sm:flex-col lg:flex-row bg-#49bf49 rounded-md shadow-lg"
                      >
                        <div className="w-full text-justify sm:mt-6 lg:mt-0 sm:w-full lg:w-5/5">
                          <p>{card.defination}</p>
                        </div>
                      </div>
                    ) : null
                  )}

                  <div
                    style={{ userSelect: "none" }}
                    className="px-8 py-6 mt-6 text-center"
                  >
                    <span
                      className="text-3xl mr-10 cursor-pointer"
                      onClick={() => decrementCard(-1, group.state)}
                    >
                      &lt;
                    </span>
                    <span className="text-2xl ">
                      {currentCardIndex + 1}/{group.state.length}
                    </span>
                    <span
                      className="text-3xl ml-10 cursor-pointer"
                      onClick={() => incrementCard(1, group.state)}
                    >
                      &#62;
                    </span>
                  </div>
                </div>

                <div className="w-full lg:w-1/5 sm:w-full">
                  <div className="mb-2 shadow-lg">
                    <button
                      onClick={openShareModal}
                      className="bg-white w-full rounded-md px-4 py-4 font-bold flex items-center text-gray-700"
                    >
                      <BsShare className="mr-5" />
                      <span>Share</span>
                    </button>
                  </div>
                  <div className="mb-2 shadow-lg">
                    <button className="bg-white w-full rounded-md px-4 py-4 font-bold flex items-center text-gray-700">
                      <BsDownload className="mr-5" />
                      <span>Download</span>
                    </button>
                  </div>
                  <div className="mb-2 shadow-lg">
                    <button className="bg-white w-full rounded-md px-4 py-4 font-bold flex items-center text-gray-700">
                      <BsPrinter className="mr-5" />
                      <span>Print</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : null;
        })}

        <div className="popupBox" style={{ display: shareDisplay }}>
          <div className="relative w-11/12 xl:w-2/5 sm:w-11/12 p-3 sm:p-8 bg-white rounded-md ">
            <h3 className="text-lg font-semibold mb-2">Share</h3>
            <div className="flex sm:items-center flex-col sm:flex-row ">
              <p className="w-3/4 px-4 py-3 rounded-md outline-dashed outline-1 outline-blue-200">
                <span>Link :</span>&nbsp;&nbsp;
                <span>{shareUrl}</span>
              </p>
              <p className="flex mt-3 sm:mt-0">
                <BiCopy
                  className="text-2xl ml-4 cursor-pointer"
                  onClick={copyUrlToClipboard}
                  style={{ color: alertColor }}
                />
                <BsShare className="text-2xl ml-4 cursor-pointer" />
                <CgClose className="closbtn" onClick={closeShareModal} />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardDetails;
