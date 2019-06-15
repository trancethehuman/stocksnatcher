//News API from Google
var url_googlenews = function(ticker) {
    return "https://newsapi.org/v2/everything?q=" + ticker + "&from=2019-06-03&sortBy=publishedAt&apiKey=878752ccf9554d7da927b77d6e3bdfa6";
}
//Company lookup API from AlphaVantage
var url_alphavantage_info = function(companyName) {
    return "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=" + companyName + "&apikey=7BM0LVAQ2HJLUERM";
}
//Stock's price and dates API from AlphaVantage
var url_alphavantage = function(ticker) {
    return "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + ticker + "&apikey=7BM0LVAQ2HJLUERM";
}

//HTML elements
//stock elements
var mainContainer = document.getElementById("stock_data");
var div_ticker = document.createElement("div");
var div_name = document.createElement("div");
mainContainer.appendChild(div_ticker);
mainContainer.appendChild(div_name);

//news elements
var mainContainer = document.getElementById("news_data");
var div_headline1 = document.createElement("div");
var div_source1 = document.createElement("div");
var div_url1 = document.createElement("a");
var div_headline2 = document.createElement("div");
var div_source2 = document.createElement("div");
var div_url2 = document.createElement("a");
var div_headline3 = document.createElement("div");
var div_source3 = document.createElement("div");
var div_url3 = document.createElement("a");
mainContainer.appendChild(div_headline1);
mainContainer.appendChild(div_source1);
mainContainer.appendChild(div_url1);
mainContainer.appendChild(div_headline2);
mainContainer.appendChild(div_source2);
mainContainer.appendChild(div_url2);
mainContainer.appendChild(div_headline3);
mainContainer.appendChild(div_source3);
mainContainer.appendChild(div_url3);

//Action
document.getElementById("submitButton").onclick = function() {
    //Get user's input
    var companyName = document.getElementById("companyName").value;
    var ticker = "";
    var datesArray = [];
    var priceArray =[];

    //Declaring some global variables
    var coordinates = [];
    
    //Fetching Stock Ticker from Company Name
    fetch(url_alphavantage_info(companyName))
    .then(response => response.json())
    .then(function(data) {
        var data_info = data.bestMatches;

        //Showing stock's info
        div_ticker.innerHTML = 'Ticker: ' + data_info["0"]["1. symbol"];
        div_name.innerHTML = 'Company Name: ' + data_info["0"]["2. name"];
        document.getElementById("logo").setAttribute("src","http://logo.clearbit.com/" + companyName + ".com?size=80&greyscale=true");
        document.getElementById("meme").setAttribute("src","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnxzJ41Ge5zKRQL5cl5y9EaPw5gIwPvfUQbuN4CpYh3yze7-l_")
        //Assign ticker name
        ticker = data_info["0"]["1. symbol"];

        //Fetching news
        fetch(url_googlenews(ticker))
            .then(response => response.json())
            .then(function(data) {
                var data_news = data.articles;

                //Putting news info into divs
                div_headline1.innerHTML = 'Headline: ' + data_news["0"].title;
                div_source1.innerHTML = 'Source: ' + data_news["0"].source.name;
                div_url1.setAttribute ("href", data_news["0"].url);
                div_url1.innerHTML = "Link";
                div_headline2.innerHTML = 'Headline: ' + data_news["1"].title;
                div_source2.innerHTML = 'Source: ' + data_news["1"].source.name;
                div_url2.setAttribute ("href", data_news["1"].url);
                div_url2.innerHTML = "Link";
                div_headline3.innerHTML = 'Headline: ' + data_news["2"].title;
                div_source3.innerHTML = 'Source: ' + data_news["2"].source.name;
                div_url3.setAttribute ("href", data_news["2"].url);
                div_url3.innerHTML = "Link";

        })
        .catch(error => console.error(error))
        
        //Fetching Stock Prices + Dates
        fetch(url_alphavantage(ticker))
            .then(response => response.json())
            .then(function(data) {
                var data_alpha = data["Time Series (Daily)"];
                datesArray = Object.keys(data_alpha);
                datesArray.forEach(function(element) {
                    priceArray.push(parseFloat(data_alpha[element]["4. close"]));
                })
            //Chart
            var data = [
                {
                    x: datesArray,
                    y: priceArray,
                    type: 'scatter'
                }
            ];
            Plotly.newPlot('myDiv', data, {}, {showSendToCloud: true});
            })
    })
    .catch(error => console.error(error))
}
    

    

    



