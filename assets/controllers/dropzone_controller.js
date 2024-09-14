import { Controller } from '@hotwired/stimulus';
import { Dropzone } from "dropzone";

// Prevent Dropzone from auto-discovering elements with the class 'dropzone'
Dropzone.autoDiscover = false;

/**
 * Represents a controller that connects to a Dropzone element and handles file uploads.
 * Dropzone specification – https://docs.dropzone.dev/configuration/basics/configuration-options
 * @extends Controller
 * @class
 */
export default class extends Controller
{
    static values = {
        url: String  // Allows for passing a dynamic URL if needed
    }

    connect() {
        this.dropzone = new Dropzone(this.element, {
            url: this.urlValue,
            maxFiles: this.element.dataset.maxFiles,
            uploadMultiple: this.element.dataset.maxFiles > 0,
            acceptedFiles: "image/*",
            // addRemoveLinks: true,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            },
            success: (file, response) => {
                $('.dz-file-preview').css('display', 'none');
            },
            error: (file, response) => {
                console.error("File upload error", response);
                $('.dz-file-preview').css('display', 'none');
            },
            init: function() {
                if (this.element.dataset.maxFiles == 1) {
                    this.on("maxfilesexceeded", function(file) {
                        this.removeAllFiles(); // Remove all files if another file is added
                        this.addFile(file); // Add the new file
                    });
                }
            },
        });
    }

    disconnect() {
        // Cleanup to ensure no memory leaks
        if (this.dropzone) {
            this.dropzone.destroy();
            this.dropzone = null;
        }
    }
}