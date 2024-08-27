import { NextRequest, NextResponse } from "next/server";
import { toCamelCase, toPascalCase, toSnakeCase } from "@/app/utils/fileUtils";

type DefaultFields = {
    id?: boolean;
    pid?: boolean;
    ptable?: boolean;
    ctable?: boolean;
    tstamp?: boolean;
    sorting?: boolean;
    [key: string]: any;
};
export async function POST(req: NextRequest) {
    const body = await req.json();
    const { tableName, defaultFields, dcaFormsData } = body;

    let entityContent = '';
    let repositoryContent = '';
    let dcaContent = '';
    if (tableName && dcaFormsData) {
        entityContent = Entity(tableName, defaultFields, dcaFormsData);
        repositoryContent = Repository(tableName, defaultFields, dcaFormsData);
        dcaContent = Dca(tableName, defaultFields, dcaFormsData);
    }
    return NextResponse.json({ success: true, entityContent: entityContent, repositoryContent: repositoryContent, dcaContent: dcaContent });
}
function Entity( tableName: string, defaultFields: DefaultFields, dcaFormsData: any[]) {
    let fields = '';
    let getterSetters = '';
    
    dcaFormsData.forEach(element => {
        
        fields += `    /**
     * @ORM\Column(type="${element.sqlType}", length=${element.sqlLength}, ${element.sqlNullable ? 'nullable=true' : ''}, options={"default": "${element.sqlDefault}"${element.sqlUnsigned ? ', unsigned=true' : ''}})
     */
    protected $${element.field};\n`;

        getterSetters += `    /**
     * Get the ${element.field}.
     *
     * @return resource|null
     */
    public function get${toPascalCase(element.field)}()
    {
        return $this->${element.field};
    }

    /**
     * Set the ${element.field}.
     *
     * @param resource|null $${element.field}
     */
    public function set${toPascalCase(element.field)}($${element.field})
    {
        $this->${element.field} = $${element.field};
    }\n`;
    });
    
    const content = `<?php

/*
    * This file is part of Contao.
    *
    * (c) Leo Feyer
    *
    * @license LGPL-3.0-or-later
*/

###Copyright###

namespace ###Namespace###\\Entity;

use Doctrine\\ORM\\Mapping as ORM;
use Doctrine\\ORM\\Mapping\\GeneratedValue;
use Doctrine\\ORM\\Mapping\\UniqueConstraint;
use Symfony\\Component\\Security\\Core\\User\\UserInterface;

/**
 * @ORM\\Table(name="${tableName}"
 * @ORM\\Entity(repositoryClass="###Namespace###\\Repository\\${toCamelCase(tableName)}Repository")
*/
class ${toCamelCase(tableName)}
{
${fields}
${getterSetters}
   
                    
}`;

    return content;
};

function Repository (tableName: string, defaultFields: DefaultFields, dcaFormsData: any[]) {
    const content = `<?php
declare(strict_types=1);
###Copyright###

namespace ###Namespace###\\Repository;

use ###Namespace###\\Entity\\${toCamelCase(tableName)};
use Doctrine\\Bundle\\DoctrineBundle\\Repository\\ServiceEntityRepository;
use Doctrine\\DBAL\\ParameterType;
use Doctrine\\Persistence\\ManagerRegistry;

/**
 * Class ${toCamelCase(tableName)}Repository
 * @package ###Namespace###\\Repository
 */
class ${toCamelCase(tableName)}Repository extends ServiceEntityRepository
{
	private $strTable = '${tableName}';
    /**
     * ###Namespace### constructor.
     *
     * @param ManagerRegistry $registry
     */
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ${toCamelCase(tableName)}::class);
        
        /** @var Connection $connection */
        $connection = $registry->getConnection();

        $this->connection = $connection;
    }

    
}`;
    return content;
};

function Dca(tableName: string, defaultFields: DefaultFields, dcaFormsData: any[]) {
    const idContent = `'id' => array
		(
			'sql'                     => "int(10) unsigned NOT NULL auto_increment"
		),`;
    
    const pidContent = `'pid' => array
		(
			'sql'                     => "int(10) unsigned NOT NULL default 0"
		),`;
    const ptableContent = `'ptable' => array
		(
			'sql'                     => "varchar(64) COLLATE ascii_bin NOT NULL default 'tl_article'"
		),`;
    const ctableContent = `'ctable' => array
		(
			'sql'                     => "varchar(64) COLLATE ascii_bin NOT NULL default 'tl_content'"
		),`;
    const tstampContent = `'tstamp' => array
		(
			'sql'                     => "int(10) unsigned NOT NULL default 0"
		),`;
    const sortingContent = `'sorting' => array
		(
			'sql'                     => "int(10) unsigned NOT NULL default 0"
		),`;

    let fieldContents = '';

    
    dcaFormsData.forEach(element => {
        
        fieldContents += `        '${element.field}' => array(
            'label'                      => &$GLOBALS['TL_LANG']['${tableName}']['${element.field}'],
            ${element.otherExclude ? `'exclude'                 => true,` : ''}
            ${element.otherToggle ? `'toggle'                      => true,` : ''}
            ${element.otherSearch ? `'search'                      => true,` : ''}
            ${element.otherSorting ? `'sorting'                      => true,` : ''}
            ${element.otherFilter ? `'filter'                      => true,` : ''}
            'inputType'             => '${element.fieldType}',
            ${element.optionsValue ? `'options'                 => [${element.optionsValue}],` : ''}
            'eval'                       => [${element.evals}]
        ),\n`;       
        
    });

    const content = `<?php 

###Copyright###

/**
 * Table ${tableName}
 */
$GLOBALS['TL_DCA']['${tableName}'] = array(

    // Config
    'config' => array(
        'dataContainer'               => 'Table',
        'enableVersioning'            => false,
        'sql' => array(
            'keys' => array(
                'id' => 'primary',
            )
        ),
    ),

    // List
    'list' => array(
        'sorting' => array(
            'mode'                    => 1,
            'fields'                  => array('id'),
            'panelLayout'             => 'sort,filter;search,limit',
            'headerFields'            => array('id'),
            'disableGrouping'          => true
        ),
        'label' => array(
            'fields'                  => array('id'),
            'format'                  => '%s'
        ),
        'global_operations' => array(
            'all' => array(
                'label'               => &$GLOBALS['TL_LANG']['MSC']['all'],
                'href'                => 'act=select',
                'class'               => 'header_edit_all',
                'attributes'          => 'onclick="Backend.getScrollOffset();" accesskey="e"'
            )
        ),
        'operations' => array(
            'edit' => array(
                'label'               => &$GLOBALS['TL_LANG']['${tableName}']['edit'],
                'href'                => 'act=edit',
                'icon'                => 'edit.gif'
            ),
            'copy' => array(
                'label'               => &$GLOBALS['TL_LANG']['${tableName}']['copy'],
                'href'                => 'act=paste&amp;mode=copy',
                'icon'                => 'copy.gif'
            ),
            'delete' => array(
                'label'               => &$GLOBALS['TL_LANG']['${tableName}']['delete'],
                'href'                => 'act=delete',
                'icon'                => 'delete.gif',
                'attributes'          => 'onclick="if (!confirm(\'' . $GLOBALS['TL_LANG']['MSC']['deleteConfirm'] . '\')) return false; Backend.getScrollOffset();"'
            ),
            'show' => array(
                'label'               => &$GLOBALS['TL_LANG']['${tableName}']['show'],
                'href'                => 'act=show',
                'icon'                => 'show.gif'
            )
        )
    ),

    // Palettes
    'palettes' => array(
        'default'                     => '',
    ),

    // Fields
    'fields' => array(
        ${defaultFields.id ? idContent : ''}
        ${defaultFields.pid ? pidContent : ''}
        ${defaultFields.ptable ? ptableContent : ''}
        ${defaultFields.ctable ? ctableContent : ''}
        ${defaultFields.tstamp ? tstampContent : ''}
        ${defaultFields.sorting ? sortingContent : ''}       
${fieldContents} 
    )
);
`;

    return content;
}