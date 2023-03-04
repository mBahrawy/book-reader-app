"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_provider_1 = __importDefault(require("./services/data-provider"));
const reader = (function () {
    class Controller {
        // constructor() {}
        initWithBookId(bookId) {
            return __awaiter(this, void 0, void 0, function* () {
                this.htmlExtractor = new data_provider_1.default(bookId);
                console.log(yield this.htmlExtractor.extractChapters());
                //   this.detectUserPreferences(bookId)
                //   this.setupHandlers()
                //   this.setupEventListeners()
            });
        }
    }
    const controller = new Controller();
    controller.initWithBookId("26dd5f00-0c75-4367-adea-537ece731385");
})();
//# sourceMappingURL=main.js.map