<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <html>
        <head>
            <title>Movies List</title>
        </head>
        <body>
            <h2>List of Movies</h2>

            <table border="1">
                <tr>
                    <th>Movie</th>
                    <th>Actor</th>
                    <th>Year</th>
                </tr>

                <!-- Loop through each movie in moviecatalog -->
                <xsl:for-each select="moviecatalog/movie">
                <xsl:sort select="artist"/>
                <xsl:if test="actor='Vijay'">
                
                    <tr>
                        <td><xsl:value-of select="name"/></td>
                        <td><xsl:value-of select="actor"/></td>
                        <td><xsl:value-of select="year"/></td>
                    </tr>
                    </xsl:if>
                </xsl:for-each>
            </table>
        </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
