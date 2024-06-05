//@ts-nocheck
"use client"

import { LegacyRef } from "react";
import localFont from "next/font/local";

const bbc = localFont({ src: "/../app/sarkar_bbc.ttf" });


interface QuestionModalProps {
  text: string,
  modalRef: LegacyRef<HTMLDialogElement>,
  handleClick: any;
}
export default function QuestionModal({modalRef, text, handleClick}: QuestionModalProps) {
  return (
    <dialog ref={modalRef} className={`${bbc.className} modal`}>
      <div className="modal-box">
        <h3 className="font-bold text-sm text-white">
          دڵنیایت دەتەوێت ئەم {text}ە بسڕیتەوە؟
        </h3>
        <p className="py-4 text-white">
          بە هەڵبژاردنی بەڵێ تۆماری {text}ەکە دەسڕدرێتەوە{" "}
        </p>
        <div className="modal-action">
          <form method="dialog">
            <button onClick={handleClick} className="btn btn-error text-white mx-[2px] w-24">
              بەڵێ
            </button>
            <button 
              className="btn btn-info text-white mx-[2px] w-24"
              onClick={() => (modalRef.current as HTMLDialogElement).close()}
            >
              نەخێر
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
