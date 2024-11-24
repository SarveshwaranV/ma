<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" >
    <xsl:template match="/">
        <html>
            <body>
                <h2>OrgoFarm - Fruits Category</h2>
                <table border="1">
                    <tr>
                        <th>Product ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Farmer Name</th>
                    </tr>
                    <!-- Filter and display only the Products under Fruits -->
                    <xsl:for-each select="OrgoFarm/Products/Fruits/Product">
                        <tr>
                            <td><xsl:value-of select="@id"/></td>
                            <td><xsl:value-of select="Name"/></td>
                            <td><xsl:value-of select="Price"/></td>
                            <td><xsl:value-of select="Quantity"/></td>
                            <td><xsl:value-of select="FarmerName"/></td>
                        </tr>
                    </xsl:for-each>
                </table>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
