import React from "react";

const UpdateProfil = () => {
  return (
    <div className="w-full h-full absolute top-0 left-0 rounded-[16px] black ">
      <div className="text-center text-3xl mt-3">Profilini Güncelle</div>
      <form
        name="form"
        id="updateForm"
        className="cam w-full h-full px-5 py-3 flex flex-col gap-5"
      >
        <div className="flex justify-around flex-wrap">
          <div className="flex flex-col gap-1 w-[200px]">
            <label className="text-2xl cursor-pointer" htmlFor="uname">
              Kullanıcı Adı
            </label>
            <input
              placeholder="Kullanıcı Adı"
              className="outline-none focus:border focus:border-blue-500 px-0.5 py-1 text-xl rounded-[8px] text-black focus:bg-blue-500"
              type="text"
              id="uname"
            />
          </div>
          <div className="flex flex-col gap-1 w-[200px]">
            <label className="text-2xl cursor-pointer" htmlFor="uname">
              Profil Resmi URL
            </label>
            <input
              placeholder="Profil URL"
              className="outline-none focus:border focus:border-blue-500 px-0.5 py-1 text-xl rounded-[8px] text-black focus:bg-blue-500"
              type="text"
              id="uphoto"
            />
          </div>
        </div>

        <button className="!py-0 btn">Kaydet</button>
      </form>
    </div>
  );
};

export default UpdateProfil;
