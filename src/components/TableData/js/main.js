window.onload = () => {
  const $ = document.querySelector.bind(document);
  const $$ = document.querySelectorAll.bind(document);
  const statusBtns=$$('.ios-switch input[type="checkbox"]');
  for(let i=0;i<statusBtns.length;i++) {
    statusBtns[i].onclick=function (e) {
        if (e.target.closest("tr").classList.contains("active")) {
          e.target.closest("tr").classList.remove("active");
        } else {
          e.target.closest("tr").classList.add("active");
        }
      }
  }

  // $(".js-check-all").onclick = function (e) {
  //   if (e.target.prop("checked")) {
  //     $('.control--checkbox input[type="checkbox"]').each(function (e) {
  //       e.target.prop("checked", true);
  //     });
  //   } else {
  //     $('.control--checkbox input[type="checkbox"]').each(function (e) {
  //       e.target.prop("checked", false);
  //     });
  //   }
  // };

  // $(".js-ios-switch-all").on("click", function () {
  //   if (e.target.prop("checked")) {
  //     $('.ios-switch input[type="checkbox"]').each(function (e) {
  //       e.target.prop("checked", true);
  //       e.target.closest("tr").addClass("active");
  //     });
  //   } else {
  //     $('.ios-switch input[type="checkbox"]').each(function (e) {
  //       e.target.prop("checked", false);
  //       e.target.closest("tr").removeClass("active");
  //     });
  //   }
  // });

  // $('.ios-switch input[type="checkbox"]').on("click", function (e) {
  //   if (e.target.closest("tr").hasClass("active")) {
  //     e.target.closest("tr").removeClass("active");
  //   } else {
  //     e.target.closest("tr").addClass("active");
  //   }
  // });
}
