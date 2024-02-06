import React from "react";

const UpdateProfil = () => {
  return (
    <div className="w-full h-full absolute top-0 left-0 rounded-[16px] ">
      <div className="text-center text-2xl md:text-3xl mt-3">
        Profilini Güncelle
      </div>
      <form
        name="form"
        id="updateForm"
        className="cam w-full h-full px-5 py-3 flex flex-col gap-2 md:gap-4 "
      >
        <div className="flex flex-col flex-wrap md:gap-5">
          <div className="flex flex-col gap-1 w-[300px] ">
            <label className="text-xl cursor-pointer" htmlFor="uname">
              Kullanıcı Adı
            </label>
            <input
              placeholder="Kullanıcı Adı"
              className="bg-gray-50 border border-gray-300 text-white sm:text-sm rounded-lg block p-1.5 bg-transparent outline-none focus:border focus:border-[#008cff] w-[230px] md:w-[300px]"
              type="text"
              id="uname"
            />
          </div>
          <div className="flex flex-col gap-1 w-[300px]">
            <label className="text-xl cursor-pointer" htmlFor="uname">
              Profil Resmi URL
            </label>
            <input
              placeholder="Profil URL"
              className="bg-gray-50 border border-gray-300 text-white sm:text-sm rounded-lg block p-1.5 bg-transparent outline-none focus:border focus:border-[#008cff] w-[230px] md:w-[300px]"
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
