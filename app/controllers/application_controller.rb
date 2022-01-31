class ApplicationController < ActionController::Base
  protect_from_forgery unless: -> { request.format.json? }

  after_action :set_request_header
  before_action :allow_cors

  def options
    head :ok, status: 200, 'Access-Control-Allow-Headers' => 'accept, content-type'
  end

  def allow_cors
    headers['Access-Control-Allow-Origin'] = '*'
    headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, DELETE, OPTIONS'
    headers['Access-Control-Allow-Headers'] = 'Content-Type, authorization'
    headers['Access-Control-Max-Age'] = '1728000'
    headers['Access-Control-Expose-Headers'] = 'authorization'
  end

  def set_request_header
    headers['Access-Control-Allow-Origin'] = '*'
    headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, DELETE, OPTIONS'
    headers['Access-Control-Allow-Headers'] = 'Content-Type, authorization'
    headers['Access-Control-Max-Age'] = '1728000'
    headers['Access-Control-Expose-Headers'] = 'authorization'
  end

end
