$(document).ready(function () {
  // Function to fetch data from the CoinGecko API
  function fetchCryptoPrices() {
    $.ajax({
      url: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr",
      method: "GET",
      success: function (data) {
        displayCryptoData(data);
      },
      error: function () {
        alert("Error fetching data");
      },
    });
  }

  // Function to display cryptocurrency data in the table
  function displayCryptoData(data) {
    const tableBody = $("#crypto-table tbody");
    tableBody.empty(); 

    data.forEach((coin) => {
      const row = `<tr>
                <td>${coin.name}</td>
                <td>${coin.symbol.toUpperCase()}</td>
                <td>₹${coin.current_price.toLocaleString()}</td>
            </tr>`;
      tableBody.append(row);
    });
  }

  // Search functionality: filter coins by name
  function filterCoins() {
    const query = $("#search-bar").val().toLowerCase();
    $("#crypto-table tbody tr").each(function () {
      const coinName = $(this).find("td:first").text().toLowerCase();
      if (coinName.includes(query)) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  }

  // Event listener for the refresh button
  $("#refresh-btn").on("click", function () {
    fetchCryptoPrices();
  });

  // Initial fetch of cryptocurrency data when the page loads
  fetchCryptoPrices();
});
