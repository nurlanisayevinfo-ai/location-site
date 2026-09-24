document.addEventListener("DOMContentLoaded", function () {

    const modal = document.getElementById("locationModal");
    const locationButton = document.getElementById("locationButton");
    const closeButton = document.getElementById("closeButton");
    const status = document.getElementById("status");

    modal.style.display = "flex";

    locationButton.addEventListener("click", function () {

        if (!navigator.geolocation) {
            status.textContent = "Bu brauzer konumu dəstəkləmir.";
            return;
        }

        status.textContent = "Konum icazəsi gözlənilir...";

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
                        status.textContent = "Konum uğurla paylaşıldı.";
                    } else {
                        status.textContent = "Konum göndərilə bilmədi.";
                    }

                } catch (error) {
                    status.textContent = "Serverə qoşulmaq mümkün olmadı.";
                }
            },

            function (error) {

                if (error.code === 1) {
                    status.textContent = "Konum icazəsi verilmədi.";
                } else {
                    status.textContent = "Konum alınmadı.";
                }

            }
        );
    });

    closeButton.addEventListener("click", function () {
        modal.style.display = "none";
    });

});