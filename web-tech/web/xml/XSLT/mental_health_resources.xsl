<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" indent="yes"/>

    <!-- Template for the root element -->
    <xsl:template match="/">
        <html>
            <head>
                <title>Mental Health Resources</title>
            </head>
            <body>
                <h1>Mental Health Resources</h1>
                
                <h2>Therapists</h2>
                <table border="1">
                    <tr>
                        <th>Name</th>
                        <th>Specialization</th>
                        <th>Contact</th>
                        <th>Email</th>
                        <th>Location</th>
                    </tr>
                    <xsl:for-each select="mental_health_resources/therapists/therapist">
                        <xsl:sort select="name" order="ascending"/> <!-- Sort therapists by name -->
                        <tr>
                            <td><xsl:value-of select="name"/></td>
                            <td><xsl:value-of select="specialization"/></td>
                            <td><xsl:value-of select="contact"/></td>
                            <td><xsl:value-of select="email"/></td>
                            <td><xsl:value-of select="location"/></td>
                        </tr>
                    </xsl:for-each>
                </table>
                
                <h2>Helplines</h2>
                <table border="1">
                    <tr>
                        <th>Name</th>
                        <th>Contact Number</th>
                        <th>Hours</th>
                        <th>Website</th>
                    </tr>
                    <xsl:for-each select="mental_health_resources/helplines/helpline">
                        <xsl:sort select="name" order="ascending"/> <!-- Sort helplines by name -->
                        <tr>
                            <td><xsl:value-of select="name"/></td>
                            <td><xsl:value-of select="number"/></td>
                            <td><xsl:value-of select="hours"/></td>
                            <td><xsl:value-of select="website"/></td>
                        </tr>
                    </xsl:for-each>
                </table>

                <h2>Support Groups</h2>
                <table border="1">
                    <tr>
                        <th>Name</th>
                        <th>Meeting Time</th>
                        <th>Location</th>
                    </tr>
                    <xsl:for-each select="mental_health_resources/support_groups/group">
                        <xsl:sort select="name" order="ascending"/> <!-- Sort support groups by name -->
                        <tr>
                            <td><xsl:value-of select="name"/></td>
                            <td><xsl:value-of select="meeting_time"/></td>
                            <td><xsl:value-of select="location"/></td>
                        </tr>
                    </xsl:for-each>
                </table>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
