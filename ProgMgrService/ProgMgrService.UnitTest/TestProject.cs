using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ProgMgrService;
using ProgMgrService.Controllers;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;

namespace ProgMgrService.UnitTest
{
    [TestClass]
    public class TestProject
    {
        [TestMethod]
        public void Test_Get_Pos()
        {
            projecttableController obj = new projecttableController();
            int actualCount = obj.Get4Testing(0);
            int expectedCount = 6;

            Assert.AreEqual(expectedCount, actualCount);
        }

        [TestMethod]
        public void Test_Get_Neg()
        {
            projecttableController obj = new projecttableController();
            int actualCount = obj.Get4Testing(0);
            int expectedCount = 7;
            //Negative Test case
            Assert.AreEqual(expectedCount, actualCount);
        }

        [TestMethod]
        public void Test_Post_Pos()
        {

            projecttableController obj = new projecttableController();
            bool actualRes = obj.Post4Testing(0);
            bool expectedRes = true;
            Assert.AreEqual(expectedRes, actualRes);
        }

        [TestMethod]
        public void Test_Delete_Pos()
        {
            int delRow = 6;
            projecttableController obj = new projecttableController();
            bool actualRet = obj.Delete4Testing(delRow);
            bool expectedRet = false;
            Assert.AreEqual(expectedRet, actualRet);
        }

        [TestMethod]
        public void Test_Delete_Neg()
        {
            int delRow = 6;
            projecttableController obj = new projecttableController();
            bool actualRet = obj.Delete4Testing(delRow);
            bool expectedRet = true;
            Assert.AreEqual(expectedRet, actualRet);
        }

        [TestMethod]
        public void Test_Put_Pos()
        {
            projecttableController obj = new projecttableController();
            bool actualRes = obj.Put4Testing(0);
            bool expectedRes = true;
            Assert.AreEqual(expectedRes, actualRes);
        }
    }
}
