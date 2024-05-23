import HTTPTransport from "./httpTransport.ts";
import { expect } from "chai";
import sinon, {
  SinonFakeXMLHttpRequest,
  SinonFakeXMLHttpRequestStatic,
} from "sinon";


describe("HTTPTransport", () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let request: SinonFakeXMLHttpRequest;
  let http: HTTPTransport;

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();
    // @ts-ignore
    global.XMLHttpRequest = xhr;
    xhr.onCreate = req => {
      request = req;
    };

    http = new HTTPTransport();
  });

  afterEach(() => {
    xhr.restore();
  });

  describe('GET request', () => {
    beforeEach(() => {
        http.get("http://random-url.com");
     });
     
     it("should make request with GET method", async () => {
        expect(request.method).to.be.equal("GET");
     });

     it("should make request with proper url", async () => {
        expect(request.url).to.be.equal("http://random-url.com");
     });
     it("should append query string to the URL", async () => {
        http.get("http://random-url.com", { data: { param1: "value1", param2: "value2" } });
        expect(request.url).to.be.equal("http://random-url.com?param1=value1&param2=value2");
      });
  });

  describe('POST request', () => {
    beforeEach(() => {
        const data = { user: "SomeUser" };
        http.post("http://random-url.com", { data });
    });

    it("should make request with POST method", async () => {
        expect(request.method).to.be.equal("POST");
    });

    it("should make request with proper url", async () => {
        expect(request.url).to.be.equal("http://random-url.com");
    });

    it("should make a POST request with proper data", async () => {
        const data = { user: "SomeUser" };
        const properData = JSON.stringify(data)
        expect(request.requestBody).to.be.equal(properData);
    });
  });

  describe('PUT request', () => {
    beforeEach(() => {
        const data = { chat: "SomeChatName" };
        http.put("http://random-url.com", { data });
    });

    it("should make request with PUT method", async () => {
        expect(request.method).to.be.equal("PUT");
    });

    it("should make request with proper url", async () => {
        expect(request.url).to.be.equal("http://random-url.com");
    });

    it("should make a PUT request with proper data", async () => {
        const data = { chat: "SomeChatName" };
        const properData = JSON.stringify(data)
        expect(request.requestBody).to.be.equal(properData);
    });
    it("should handle FormData for PUT request", async () => {
        const formData = new FormData();
        formData.append("key", "value");
        http.put("http://random-url.com", { data: formData });
        expect(request.requestBody).to.be.equal(formData);
      });
  });

  describe('DELETE request', () => {
    beforeEach(() => {
        const data = { chatId: "324" };
        http.delete("http://random-url.com", { data });
    });

    it("should make request with DELETE method", async () => {
        expect(request.method).to.be.equal("DELETE");
    });

    it("should make request with proper url", async () => {
        expect(request.url).to.be.equal("http://random-url.com");
    });

    it("should make a DELETE request with proper data", async () => {
        const data = { chatId: "324" };
        const properData = JSON.stringify(data)
        expect(request.requestBody).to.be.equal(properData);
    });
  })
});