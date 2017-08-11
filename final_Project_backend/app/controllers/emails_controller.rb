class EmailsController < ApplicationController

    def index
        render json: Email.all
    end

end
