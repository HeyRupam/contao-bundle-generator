// app/api/create-zip/route.ts

import { NextRequest, NextResponse } from "next/server";
import archiver from "archiver";
import { Readable } from "stream";
import fs from "fs";
import path from "path";
import { processAndAddFileToZip, toSnakeCase } from "@/app/utils/fileUtils";

export async function POST(req: NextRequest) {
  // Extract any necessary data from the request body if needed
  const body = await req.json();
  const { bundleName, namespace, copyright, route, bootstrapCss, fontAwesomeCss, fancyboxCss, bootstrapJs, fancyboxJs, jqueryJs, wowJs } = body;
  
  // Set up the ZIP archive
  const archive = archiver('zip', {
    zlib: { level: 9 }, // Sets the compression level
  });

  // Handle errors
  archive.on('error', (err) => {
    console.error('Archiver error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  });

    // Path to the existing text file
    const composerPath = path.join(process.cwd(), 'files', 'composer.json.txt');
    const lisencePath = path.join(process.cwd(), 'files', 'LICENSE.txt');
    const phputilPath = path.join(process.cwd(), 'files', 'phpunit.xml.dist.txt');
    const bundleNamePath = path.join(process.cwd(), 'files', 'BundleName.php.txt');
    const bundleNameExtensionPath = path.join(process.cwd(), 'files', 'BundleNameExtension.php.txt');
    const PluginPath = path.join(process.cwd(), 'files', 'Plugin.php.txt');
    const PluginWithRoutePath = path.join(process.cwd(), 'files', 'PluginWithRoute.php.txt');
    const configPath = path.join(process.cwd(), 'files', 'config.php.txt');
    const servicesPath = path.join(process.cwd(), 'files', 'services.yaml.txt');
    const routesPath = path.join(process.cwd(), 'files', 'routes.yaml.txt');
    //css
    const bootstrapCssPath = path.join(process.cwd(), 'files', 'css', 'bootstrap.min.css');
    const fontAwesomeCssPath = path.join(process.cwd(), 'files', 'css', 'font-awesome.min.css');
    const fancyboxCssPath = path.join(process.cwd(), 'files', 'css', 'jquery.fancybox.min.css');
    //js
    const bootstrapJsPath = path.join(process.cwd(), 'files', 'js', 'bootstrap.min.js');
    const fancyboxJsPath = path.join(process.cwd(), 'files', 'js', 'jquery.fancybox.min.js');
    const jqueryJsPath = path.join(process.cwd(), 'files', 'js', 'jquery.min.js');
    const wowJsPath = path.join(process.cwd(), 'files', 'js', 'wow.min.js');


    const bundleNameSnakeCase = toSnakeCase(bundleName);
    
    try {
      // Use the reusable function to process and add the file content to the ZIP archive
      processAndAddFileToZip(archive, composerPath, `${bundleNameSnakeCase}/composer.json`, {bundleName, namespace});
      processAndAddFileToZip(archive, lisencePath, `${bundleNameSnakeCase}/LICENSE`, {});
      processAndAddFileToZip(archive, phputilPath, `${bundleNameSnakeCase}/phpunit.xml.dist`, {});
      processAndAddFileToZip(archive, bundleNamePath, `${bundleNameSnakeCase}/src/BundleName.php`, {bundleName, namespace, copyright});
      processAndAddFileToZip(archive, bundleNameExtensionPath, `${bundleNameSnakeCase}/src/DependencyInjection/BundleNameExtension.php`, {bundleName, namespace, copyright});
      processAndAddFileToZip(archive, (route? PluginWithRoutePath : PluginPath), `${bundleNameSnakeCase}/src/ContaoManager/Plugin.php`, {bundleName, namespace, copyright});
      processAndAddFileToZip(archive, configPath, `${bundleNameSnakeCase}/contao/config/config.php`, {bundleName, copyright});
      processAndAddFileToZip(archive, servicesPath, `${bundleNameSnakeCase}/config/services.yaml`, {});
      if(route){
        processAndAddFileToZip(archive, routesPath, `${bundleNameSnakeCase}/config/routes.yaml`, {});
        processAndAddFileToZip(archive, routesPath, `${bundleNameSnakeCase}/src/Controller/`, {});
      }
      if(bootstrapCss){
        processAndAddFileToZip(archive, bootstrapCssPath, `${bundleNameSnakeCase}/public/css/bootstrap.min.css`, {});
      }
      if(fontAwesomeCss){
        processAndAddFileToZip(archive, fontAwesomeCssPath, `${bundleNameSnakeCase}/public/css/font-awesome.min.css`, {});
      }
      if(fancyboxCss){
        processAndAddFileToZip(archive, fancyboxCssPath, `${bundleNameSnakeCase}/public/css/jquery.fancybox.min.css`, {});
      }
      if(bootstrapJs){
        processAndAddFileToZip(archive, bootstrapJsPath, `${bundleNameSnakeCase}/public/js/bootstrap.min.js`, {});
      }
      if(fancyboxJs){
        processAndAddFileToZip(archive, fancyboxJsPath, `${bundleNameSnakeCase}/public/js/jquery.fancybox.min.js`, {});
      }
      if(jqueryJs){
        processAndAddFileToZip(archive, jqueryJsPath, `${bundleNameSnakeCase}/public/js/jquery.min.js`, {});
      }
      if(wowJs){
        processAndAddFileToZip(archive, wowJsPath, `${bundleNameSnakeCase}/public/js/wow.min.js`, {});
      } 
    } catch (err) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }





  // Finalize the archive
  archive.finalize();

  // Create a readable stream from the archive
  const archiveStream = Readable.from(archive);

  // Return the ZIP file as a response
  return new NextResponse(archiveStream, {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': 'attachment; filename=${bundleNameSnakeCase}.zip',
      'X-Bundle-Name': bundleNameSnakeCase
    },
  });
}
