// app/api/create-zip/route.ts

import { NextRequest, NextResponse } from "next/server";
import archiver from "archiver";
import { Readable } from "stream";
import path from "path";
import { processAndAddFileToZip, toSnakeCase, toPascalCase } from "@/app/utils/fileUtils";
import fs from 'fs';
import { config } from "process";


export async function POST(req: NextRequest) {
  // Extract any necessary data from the request body if needed
  const body = await req.json();
  const { bundleName, namespace, copyright, route, bootstrapCss, fontAwesomeCss, fancyboxCss, bootstrapJs, fancyboxJs, jqueryJs, wowJs, elementsData } = body;
  
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
    //elements
    const contentElementPath = path.join(process.cwd(), 'files', 'elements', 'ContentElementController.php.txt');
    const backendModulePath = path.join(process.cwd(), 'files', 'elements', 'BEMod.php.txt');
    const cronPath = path.join(process.cwd(), 'files', 'elements', 'Cron.php.txt');
    const frontendModulePath = path.join(process.cwd(), 'files', 'elements', 'FrontendModuleController.php.txt');
    //template
    const templatePath = path.join(process.cwd(), 'files', 'template.html.twig.txt');


    const bundleNameSnakeCase = toSnakeCase(bundleName);
    
    try {
      // Use the reusable function to process and add the file content to the ZIP archive
      processAndAddFileToZip(archive, composerPath, `${bundleNameSnakeCase}/composer.json`, {bundleName, namespace});
      processAndAddFileToZip(archive, lisencePath, `${bundleNameSnakeCase}/LICENSE`, {});
      processAndAddFileToZip(archive, phputilPath, `${bundleNameSnakeCase}/phpunit.xml.dist`, {});
      processAndAddFileToZip(archive, bundleNamePath, `${bundleNameSnakeCase}/src/${toPascalCase(bundleName)}.php`, {bundleName, namespace, copyright});
      processAndAddFileToZip(archive, bundleNameExtensionPath, `${bundleNameSnakeCase}/src/DependencyInjection/${toPascalCase(bundleName)}Extension.php`, {bundleName, namespace, copyright});
      processAndAddFileToZip(archive, (route? PluginWithRoutePath : PluginPath), `${bundleNameSnakeCase}/src/ContaoManager/Plugin.php`, {bundleName, namespace, copyright});
      processAndAddFileToZip(archive, servicesPath, `${bundleNameSnakeCase}/config/services.yaml`, {});
      if(route){
        processAndAddFileToZip(archive, routesPath, `${bundleNameSnakeCase}/config/routes.yaml`, {bundleName, namespace});
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

      let configContent =`<?php

/**
* @package   [${toSnakeCase(bundleName)}]
${copyright}
*/\n`;
      let backendModulesContent = ''
      let backendModuleContent = ''
      const controllers: string[] = ["CE", "FE"];
      if(elementsData.some((data: { elementType: string; }) => controllers.includes(data.elementType))){
        const ServiceText = ``;
      }
      if(elementsData.some((data: {elementType: string;}) => data.elementType === 'Cron')){

      }


      elementsData.forEach((data: any) => {        
        const elementName: string = data.element;
        if(data.elementType == 'CE'){
          processAndAddFileToZip(archive, contentElementPath, `${bundleNameSnakeCase}/src/Controller/ContentElement/${toPascalCase(elementName)}Controller.php`, {bundleName, namespace, copyright, elementName});
          processAndAddFileToZip(archive, templatePath, `${bundleNameSnakeCase}/contao/templates/content_element/${toSnakeCase(elementName)}.html.twig`, {});
        }
        if(data.elementType == 'BE'){
          processAndAddFileToZip(archive, backendModulePath, `${bundleNameSnakeCase}/src/BEMod/${toPascalCase(elementName)}.php`, {bundleName, namespace, copyright, elementName});
          processAndAddFileToZip(archive, templatePath, `${bundleNameSnakeCase}/contao/templates/bemod/${toSnakeCase(elementName)}.html.twig`, {});
          
          backendModuleContent += `   '${toSnakeCase(elementName)}' => array(
		'callback' => ${toPascalCase(namespace)}/${toPascalCase(bundleName)}/BEMod/${toPascalCase(elementName)}::class,
	),\n`;
        }
         
        if(data.elementType == 'FM'){
          processAndAddFileToZip(archive, frontendModulePath, `${bundleNameSnakeCase}/src/Controller/FrontendModule/${toPascalCase(elementName)}Controller.php`, {bundleName, namespace, copyright, elementName});
          processAndAddFileToZip(archive, templatePath, `${bundleNameSnakeCase}/contao/templates/frontend_module/${toSnakeCase(elementName)}.html.twig`, {});
        }
        if(data.elementType == 'Cron'){
          processAndAddFileToZip(archive, cronPath, `${bundleNameSnakeCase}/src/Cron/${toPascalCase(elementName)}.php`, {bundleName, namespace, copyright, elementName});
        }
      });

if(elementsData.some((data: {elementType: string;}) => data.elementType === 'BE')){
  backendModuleContent = configContent +`// BE MODULES

  $GLOBALS['BE_MOD']['${toSnakeCase(bundleName)}'] = array(
${backendModuleContent}
  );`;

  archive.append(backendModuleContent, { name: `${bundleNameSnakeCase}/contao/config/config.php` });
}
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }





  // Finalize the archive
  archive.finalize();

  // Create a readable stream from the archive
  const archiveStream: any = Readable.from(archive);

  // Return the ZIP file as a response
  return new NextResponse(archiveStream, {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': 'attachment; filename=${bundleNameSnakeCase}.zip',
      'X-Bundle-Name': bundleNameSnakeCase
    },
  });
}
