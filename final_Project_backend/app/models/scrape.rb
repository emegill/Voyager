



class Scrape

attr_accessor :agent, :allLinks, :allEmails, :count

        def initialize


            @allEmails = []
            @allLinks = []
            @agent = Mechanize.new
            @count = 0

        end

        def get_links(url, rootUrl)
                parse_page = agent.get(url)
                # p parse_page
                if parse_page.class == Mechanize::Page
                    get_emails(parse_page)
                    return if @count > 500
                    parse_page.search(".//a").each do |link|
                        hLink = link.attributes["href"]
                        # p hLink.value.index("/")
                        # p hLink.value


                        unless hLink.nil? || hLink.value.include?("mailto:") || @allLinks.include?(hLink.value) || !hLink.value.include?(rootUrl) || hLink.value.include?(".pdf") || hLink.value.include?("javascript") || hLink.value.include?(".doc") || hLink.value.index("/") == 0
                            @count += 1
                            p hLink.value
                            p allEmails
                            @allLinks.push(hLink.value)
                            get_links(hLink, rootUrl)
                end
            end
        end

    end

    def get_emails(page)
        pageEmail = page.at("html").text.scan(/\w+@[\w.-]+|\{(?:\w+, *)+\w+\}@[\w.-]+/)
            pageEmail.each do |email|
            unless @allEmails.include?(email)
                @allEmails.push(email)
                # Email.create
            end
        end
    end



    def run_scraper(url)
        rootUrl = url
        url = "http://"+url
        links = get_links(url, rootUrl)
        # p allLinks
        p allEmails

        # email = get_emails
        # url = get_links

        @allEmails

    end


end
