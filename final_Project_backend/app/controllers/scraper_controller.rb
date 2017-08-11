class ScraperController < ApplicationController

def index
  results = scrape
  render json: results
end

def scrape
    scraper = Scrape.new
    scraper.run_scraper(params[:siteUrl])
    scraper.allEmails


    # Email.create(email: results[:email][index], url:results[:url])

    end

end
