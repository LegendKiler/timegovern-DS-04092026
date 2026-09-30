# auto-sitemap.ps1
# This script scans all files in src/pages and generates a complete SiteMap.jsx

Write-Host "Scanning pages folder..." -ForegroundColor Cyan

# Define the pages directory
$pagesDir = "src/pages"

# Get all .jsx files (recursively, including legal subfolder)
$pageFiles = Get-ChildItem -Path $pagesDir -Filter "*.jsx" -Recurse | Where-Object { $_.Name -ne "SiteMap.jsx" }

# Create a list to hold page info
$pages = @()

foreach ($file in $pageFiles) {
    # Get relative path (e.g., "About.jsx" or "legal/PrivacyPolicy.jsx")
    $relativePath = $file.FullName.Substring((Resolve-Path $pagesDir).Path.Length + 1) -replace "\\", "/"
    
    # Get file name without extension
    $fileName = $file.BaseName
    
    # Convert file name to route path
    # Examples: About.jsx -> /about, PrivacyPolicy.jsx -> /privacy-policy, JobsPage.jsx -> /jobs
    $routePath = $fileName -replace 'Page$', ''  # Remove "Page" suffix
    $routePath = $routePath -replace '([a-z])([A-Z])', '$1-$2'  # CamelCase to hyphen
    $routePath = $routePath.ToLower()
    
    # For legal pages, prefix with /legal/ (or just the folder name)
    if ($relativePath -like "legal/*") {
        $routePath = "/legal/$routePath"
    } else {
        $routePath = "/$routePath"
    }
    
    # For pages that are not the home page, we need to handle root path
    if ($fileName -eq "HomePage") {
        $routePath = "/"
    }
    
    # Clean up double slashes
    $routePath = $routePath -replace '//', '/'
    
    # Add to list
    $pages += @{
        Path = $routePath
        Label = $fileName -replace 'Page$', '' -replace '([a-z])([A-Z])', '$1 $2'
    }
}

# Sort pages alphabetically by path
$pages = $pages | Sort-Object Path

# Generate SiteMap.jsx content
$content = @"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router-dom"

const pages = [
"@

foreach ($page in $pages) {
    $content += @"

  { to: "$($page.Path)", label: "$($page.Label)" },
"@
}

$content += @"

]

export default function SiteMap() {
  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Site Map</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pages.map((page) => (
              <Link to={page.to} key={page.to} className="text-primary hover:underline p-2 border rounded">
                {page.label}
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
"@

# Write the new SiteMap.jsx
Set-Content -Path "src/pages/SiteMap.jsx" -Value $content -Encoding UTF8

Write-Host "SiteMap.jsx generated with $($pages.Count) pages." -ForegroundColor Green
Write-Host "Run this script again after adding new pages to keep sitemap updated." -ForegroundColor Cyan
