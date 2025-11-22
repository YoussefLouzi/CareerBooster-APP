package com.ESI.CareerBooster.cv.controller;

import com.ESI.CareerBooster.cv.dto.CVUploadResponse;
import com.ESI.CareerBooster.cv.service.CVService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import jakarta.servlet.http.HttpServletRequest;
import java.util.Map;
import java.util.HashMap;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Value;
import com.ESI.CareerBooster.auth.security.JwtUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.security.core.context.SecurityContextHolder;

@Slf4j
@RestController
@RequestMapping("/api/cv")
@RequiredArgsConstructor
@Tag(name = "CV Management", description = "APIs for CV upload and processing")
@CrossOrigin(origins = {
    "http://localhost:8081",
    "http://192.168.100.155:8081",
    "exp://192.168.100.155:8081"
}, allowCredentials = "true")
public class CVController {
    private final CVService cvService;
    private final JwtUtil jwtUtil;
    
    @Operation(
        summary = "Upload and process CV",
        description = "Upload a PDF CV file for processing. Requires authentication.",
        security = @SecurityRequirement(name = "bearerAuth")
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "CV processed successfully",
            content = @Content(mediaType = "application/json",
                schema = @Schema(implementation = CVUploadResponse.class))
        ),
        @ApiResponse(responseCode = "400", description = "Invalid file or no file uploaded"),
        @ApiResponse(responseCode = "401", description = "Unauthorized - Invalid or missing token"),
        @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadCV(
            @RequestParam("file") MultipartFile file,
            HttpServletRequest request,
            @RequestParam(value = "analysisType", required = false) String analysisType) {
        log.info("=== CV Upload Request Received ===");
        log.info("Request URL: {}", request.getRequestURL());
        log.info("Content Type: {}", request.getContentType());
        log.info("Method: {}", request.getMethod());
        log.info("Analysis Type: {}", analysisType);
        
        // Log file details
        log.info("File Details:");
        log.info("- Name: {}", file.getOriginalFilename());
        log.info("- Size: {} bytes", file.getSize());
        log.info("- Content Type: {}", file.getContentType());
        
        try {
            // Validate file
            if (file == null || file.isEmpty()) {
                log.error("No file uploaded or file is empty");
                return ResponseEntity.badRequest()
                    .body(Map.of(
                        "error", "No file uploaded",
                        "message", "Please select a PDF file to upload"
                    ));
            }

            if (!file.getContentType().equals("application/pdf")) {
                log.error("Invalid file type: {}", file.getContentType());
                return ResponseEntity.badRequest()
                    .body(Map.of(
                        "error", "Invalid file type",
                        "message", "Only PDF files are allowed",
                        "receivedType", file.getContentType()
                    ));
            }

            // Get user email from SecurityContext
            String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
            log.info("Processing CV for user: {}", userEmail);
            
            // Process the file, passing analysisType
            log.info("Starting CV processing...");
            CVUploadResponse response = cvService.processCV(file, userEmail, analysisType);
            log.info("CV processing completed successfully");
            return ResponseEntity.ok(response);
            
        } catch (IOException e) {
            log.error("Error processing CV: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError()
                .body(Map.of(
                    "error", "Error processing CV",
                    "message", e.getMessage()
                ));
        } catch (Exception e) {
            log.error("Unexpected error: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError()
                .body(Map.of(
                    "error", "Unexpected error",
                    "message", e.getMessage(),
                    "type", e.getClass().getName()
                ));
        }
    }
} 